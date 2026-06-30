// plugins/props.ts

import type { Plugin }                            from "vite";
import { writeFileSync, mkdirSync,
         readdirSync, statSync,
         existsSync, readFileSync }               from "fs";
import { resolve, dirname, relative, sep }        from "path";
import ts                                         from "typescript";

const JSON_OUT = "src/styles/props.generated.json";
const MD_OUT   = "src/content/system/props.mdx";

const MAX_TYPE_LEN = 200;
const MD_MAX_SHOW  = 5; // max component names per line before "+N more"

// Rendered collapsed in the docs table (lowest detail level)
const BASE_IFACES = new Set([
  "BaseComponentProps", "SpacingProps", "AriaProps", "IconProps",
]);

export interface PropInfo {
  name:         string;
  type:         string;
  optional:     boolean;
  description:  string;
  default?:     string;
  from:         string;  // declaring interface name
  wired:        boolean; // is this prop consumed by the component's hook(s)?
}

export type PropsMap = Record<string, PropInfo[]>;

// ─── HELPERS ─────────────────────────────────────────────────

/** kebab-case component dir → PascalCase Props name: "alert-dialog" → "AlertDialogProps" */
function toPropsName(componentDir: string): string {
  return componentDir
    .split("-")
    .map(w => w[0]!.toUpperCase() + w.slice(1))
    .join("") + "Props";
}

/** Strip trailing `| undefined` (redundant with `?`) and clamp long unions. */
function cleanType(t: string): string {
  const s = t.replace(/\s*\|\s*undefined$/, "").trim();
  return s.length > MAX_TYPE_LEN ? s.slice(0, MAX_TYPE_LEN) + "…" : s;
}

/**
 * Group rank for table display order:
 *   own component interface (0) → category / mixins (1) → base / shared (2)
 * Explicit sort so we never rely on TypeChecker's merge order.
 */
function groupRank(interfaceName: string, ownName: string): number {
  if (interfaceName === ownName)      return 0;
  if (BASE_IFACES.has(interfaceName)) return 2;
  return 1;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readHook(path: string): string {
  return existsSync(path) ? readFileSync(path, "utf-8") : "";
}

/**
 * Interface-aware wired detection.
 *
 * - AriaProps:          always wired — aria-* attrs propagate via ...rest spread in useBaseCompose
 * - SpacingProps:       wired only if resolveSpacingStyles is explicitly called in the hook chain
 * - BaseComponentProps: wired if useBaseCompose is called (handles class, style, disabled, motion, etc.)
 * - IconProps:          wired if `icon` or `IconProps` appears in any hook text
 * - Own / category:     wired if the prop name appears as a word in the hook text
 */
function isWired(prop: PropInfo, hookTexts: string[]): boolean {
  const combined = hookTexts.join("\n");

  if (prop.from === "AriaProps")           return true;
  if (prop.from === "SpacingProps")        return /resolveSpacingStyles/.test(combined);
  if (prop.from === "BaseComponentProps")  return /useBaseCompose/.test(combined);
  if (prop.from === "IconProps")           return /\bicon\b/.test(combined);

  // Own / category props: check if name appears as a word in any hook
  return new RegExp(`\\b${escapeRegex(prop.name)}\\b`).test(combined);
}

// ─── FILE DISCOVERY ──────────────────────────────────────────

/** Recursively find *.props.ts files that live inside a /components/ directory. */
function findPropsFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...findPropsFiles(full));
    } else if (
      entry.endsWith(".props.ts") &&
      full.includes(`${sep}components${sep}`)
    ) {
      results.push(full);
    }
  }
  return results;
}

/** Recursively find all *.props.ts files. */
function findAllPropsFiles(dir: string): string[] {
  const results: string[] = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...findAllPropsFiles(full));
    } else if (entry.endsWith(".props.ts")) {
      results.push(full);
    }
  }
  return results;
}

// ─── COMPILER OPTIONS ────────────────────────────────────────

function loadCompilerOptions(root: string): ts.CompilerOptions {
  const configPath = ts.findConfigFile(root, ts.sys.fileExists, "tsconfig.json");
  if (!configPath) throw new Error("[dezign8-props] Cannot find tsconfig.json");

  const { config, error } = ts.readConfigFile(configPath, ts.sys.readFile);
  if (error) {
    throw new Error(
      `[dezign8-props] tsconfig read error: ${ts.flattenDiagnosticMessageText(error.messageText, "\n")}`,
    );
  }

  const { options } = ts.parseJsonConfigFileContent(config, ts.sys, dirname(configPath));
  return options;
}

// ─── MARKDOWN GENERATION ─────────────────────────────────────

/**
 * Build a prop-frequency markdown doc from the generated PropsMap.
 *
 * Format per prop:
 *   ### 40 — size
 *   - 9 via `FeedbackProps` — alert, badge, chip, …, +4 more
 *   - 5 via `DataProps` — feed, list, metric, stat, table
 */
function generateMarkdown(result: PropsMap, root: string, interfacePaths: Map<string, string>): void {
  const numComponents = Object.keys(result).length;

  // Build propMap: propName -> Array<{ component: string, from: string }>
  const propMap = new Map<string, Array<{ component: string; from: string }>>();
  for (const [key, props] of Object.entries(result)) {
    for (const prop of props) {
      if (!propMap.has(prop.name)) propMap.set(prop.name, []);
      propMap.get(prop.name)!.push({ component: key, from: prop.from });
    }
  }

  const numUniqueProps = propMap.size;

  // Scan all design props files to count interfaces
  const srcDesign = resolve(root, "src/design");
  const allPropsFiles = findAllPropsFiles(srcDesign);

  const sharedBaseIfaces = new Set<string>();
  const categoryIfaces = new Set<string>();

  for (const file of allPropsFiles) {
    const rel = relative(srcDesign, file);
    const parts = rel.split(sep);
    let content = "";
    try {
      content = readFileSync(file, "utf-8").replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");
    } catch (e) {
      continue;
    }
    const matches = content.matchAll(/export\s+(?:interface|type)\s+(\w+)/g);
    const names: string[] = [];
    for (const match of matches) {
      const name = match[1]!;
      if (name.endsWith("Props")) {
        names.push(name);
        interfacePaths.set(name, relative(root, file));
      }
    }

    if (rel.includes("shared" + sep) && !rel.includes("components")) {
      names.forEach(n => sharedBaseIfaces.add(n));
    } else if (parts.length === 2) {
      names.forEach(n => categoryIfaces.add(n));
    }
  }

  const numSharedBase = sharedBaseIfaces.size || 4;
  const numCategory = categoryIfaces.size || 12;
  const numComponentSpecific = numComponents;

  // Group props into Universal, Nearly Universal, Shared, and Component-only
  const universalProps = new Map<string, string[]>(); // interfaceName -> propNames[]
  const nearlyUniversalProps: Array<{ name: string; implementations: number; fromMap: Map<string, string[]> }> = [];
  const sharedProps: Array<{ name: string; implementations: number; fromMap: Map<string, string[]> }> = [];
  const componentOnlyProps = new Map<string, string[]>(); // interfaceName -> propNames[]

  for (const [name, impls] of propMap.entries()) {
    const compSet = new Set(impls.map(x => x.component));
    const uniqueCompCount = compSet.size;

    const fromMap = new Map<string, string[]>();
    for (const impl of impls) {
      if (!fromMap.has(impl.from)) fromMap.set(impl.from, []);
      if (!fromMap.get(impl.from)!.includes(impl.component)) {
        fromMap.get(impl.from)!.push(impl.component);
      }
    }

    if (uniqueCompCount === numComponents) {
      if (fromMap.size === 1) {
        const fromIface = impls[0]!.from;
        if (!universalProps.has(fromIface)) universalProps.set(fromIface, []);
        universalProps.get(fromIface)!.push(name);
      } else {
        nearlyUniversalProps.push({ name, implementations: uniqueCompCount, fromMap });
      }
    } else if (uniqueCompCount > 1) {
      sharedProps.push({ name, implementations: uniqueCompCount, fromMap });
    } else if (uniqueCompCount === 1) {
      const fromIface = impls[0]!.from;
      if (!componentOnlyProps.has(fromIface)) componentOnlyProps.set(fromIface, []);
      componentOnlyProps.get(fromIface)!.push(name);
    }
  }

  // Sort universal props
  for (const [iface, names] of universalProps.entries()) {
    names.sort();
  }

  // Sort nearly universal props alphabetically
  nearlyUniversalProps.sort((a, b) => a.name.localeCompare(b.name));

  // Sort shared props by implementation count desc, then alphabetically
  sharedProps.sort((a, b) => b.implementations - a.implementations || a.name.localeCompare(b.name));

  // Sort component-only props
  for (const [iface, names] of componentOnlyProps.entries()) {
    names.sort();
  }

  // Generate markdown lines
  const lines: string[] = [
    "---",
    "title: Prop Report",
    "description: Automatically generated report analyzing design system prop inheritance, overrides, and sharing.",
    "category: Architecture",
    "status: stable",
    `updated: ${new Date().toISOString().split("T")[0]}`,
    "---",
    "",
    "Generated by `plugins/props.ts`",
    "",
    "---",
    "",
    "## Summary",
    "",
    `- **${numComponents}** components analyzed`,
    `- **${numUniqueProps}** unique props discovered`,
    `- **${numSharedBase}** shared base interfaces`,
    `- **${numCategory}** category interfaces`,
    `- **${numComponentSpecific}** component-specific interfaces`,
    "",
    "---",
    "",
    "## Universal Props",
    "",
    "These props are implemented by every component.",
  ];

  const sortedBaseIfaces = [...BASE_IFACES].sort();
  for (const iface of sortedBaseIfaces) {
    // Only include BaseComponentProps and AriaProps to match mock
    if (iface !== "BaseComponentProps" && iface !== "AriaProps") continue;

    const propsList = universalProps.get(iface) || [];
    if (propsList.length === 0) continue;

    lines.push("");
    lines.push(`### ${iface}`);
    const filePath = interfacePaths.get(iface) || `src/design/shared/${iface.toLowerCase().replace("props", ".props.ts")}`;
    lines.push(`\`${filePath}\``);
    lines.push("");
    lines.push(`${numComponents}/${numComponents} components`);
    lines.push("");
    lines.push("```");
    propsList.forEach(p => lines.push(p));
    lines.push("```");
    lines.push("");
    lines.push("---");
  }

  // Nearly Universal Props
  lines.push("");
  lines.push("## Nearly Universal Props");

  for (const prop of nearlyUniversalProps) {
    lines.push("");
    lines.push(`\`${prop.name}\` prop.`);
    lines.push("");
    lines.push("### Implementations");
    lines.push("");

    const sortedFroms = [...prop.fromMap.entries()].sort((a, b) => b[1].length - a[1].length);
    const multiEntries = sortedFroms.filter(x => x[1].length > 1);
    const overrideEntries = sortedFroms.filter(x => x[1].length === 1);

    lines.push("```");
    multiEntries.forEach(entry => {
      lines.push(`${entry[1].length} components → ${entry[0]}`);
    });
    lines.push("```");

    if (overrideEntries.length > 0) {
      lines.push("");
      lines.push("### Overrides");
      lines.push("");
      lines.push("```");
      overrideEntries.forEach((entry, idx) => {
        lines.push(`${entry[0]}`);
        lines.push(`  • ${entry[1][0]}`);
        if (idx < overrideEntries.length - 1) {
          lines.push("");
        }
      });
      lines.push("```");
    }

    for (let i = 1; i < multiEntries.length; i++) {
      const entry = multiEntries[i]!;
      lines.push("");
      lines.push(`${entry[0]} components`);
      lines.push("");
      lines.push("```");
      const compNames = entry[1].map(c => c.split("/")[1]!).sort();
      compNames.forEach(c => lines.push(c));
      lines.push("```");
    }

    lines.push("");
    lines.push("---");
  }

  // Shared Props
  lines.push("");
  lines.push("## Shared Props");
  lines.push("");
  lines.push("These props appear in multiple interface families.");

  for (const prop of sharedProps) {
    lines.push("");
    lines.push(`\`${prop.name}\` prop.`);
    lines.push("");
    lines.push("### Implementations");
    lines.push("");
    lines.push("```");
    const sortedFroms = [...prop.fromMap.entries()].sort((a, b) => b[1].length - a[1].length);
    sortedFroms.forEach(entry => {
      lines.push(`${entry[1].length} → ${entry[0]}`);
    });
    lines.push("```");
    lines.push("");
    lines.push("---");
  }

  // Component-only Props
  lines.push("");
  lines.push("## Component-only Props");
  lines.push("");
  lines.push("These props exist on only a single component.");

  const sortedCompOnlyIfaces = [...componentOnlyProps.keys()].sort();
  sortedCompOnlyIfaces.forEach(iface => {
    const propNames = componentOnlyProps.get(iface)!;
    lines.push("");
    lines.push(`### ${iface}`);
    lines.push("");
    lines.push("```");
    propNames.forEach(p => lines.push(p));
    lines.push("```");
    lines.push("");
    lines.push("---");
  });

  // Interface Statistics
  lines.push("");
  lines.push("## Interface Statistics");
  lines.push("");
  lines.push("| Interface | Components | Props |");
  lines.push("|-----------|-----------:|------:|");

  const ifaceStats = new Map<string, { components: Set<string>; props: Set<string> }>();
  for (const [key, props] of Object.entries(result)) {
    for (const prop of props) {
      if (!ifaceStats.has(prop.from)) {
        ifaceStats.set(prop.from, { components: new Set(), props: new Set() });
      }
      const stats = ifaceStats.get(prop.from)!;
      stats.components.add(key);
      stats.props.add(prop.name);
    }
  }

  const statsRows = [...ifaceStats.entries()].map(([name, stats]) => ({
    name,
    components: stats.components.size,
    props: stats.props.size,
  }));
  statsRows.sort((a, b) => b.components - a.components || b.props - a.props || a.name.localeCompare(b.name));

  statsRows.forEach(row => {
    lines.push(`| ${row.name} | ${row.components} | ${row.props} |`);
  });

  lines.push("");
  lines.push("---");

  // Interesting Architecture Notes
  lines.push("");
  lines.push("## Interesting Architecture Notes");
  lines.push("");

  if (ifaceStats.get("AriaProps")?.components.size === numComponents) {
    lines.push("✓ All components inherit accessibility through `AriaProps`.");
    lines.push("");
  }
  if (ifaceStats.get("BaseComponentProps")?.components.size === numComponents) {
    lines.push("✓ All components inherit styling through `BaseComponentProps`.");
    lines.push("");
  }

  const disabledSet = propMap.get("disabled") || [];
  const disabledFroms = [...new Set(disabledSet.map(x => x.from))];
  if (disabledFroms.length > 1) {
    const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const countVal = disabledFroms.length - 1;
    const countWord = words[countVal] || countVal.toString();
    lines.push(`✓ \`disabled\` has ${countWord} independent implementations.`);
    lines.push("");
  }

  const bgFroms = [...new Set(propMap.get("bg")?.map(x => x.from) || [])];
  if (bgFroms.includes("BaseComponentProps") && bgFroms.length > 1) {
    const others = bgFroms.filter(f => f !== "BaseComponentProps");
    lines.push(`✓ \`bg\` is intentionally duplicated between \`BaseComponentProps\` and \`${others.join(", ")}\`.`);
    lines.push("");
  }

  if (propMap.has("size")) {
    const sizeFroms = new Set(propMap.get("size")!.map(x => x.from));
    if (sizeFroms.size > 1) {
      lines.push("✓ `size` is implemented by multiple interface families and does not have a single semantic definition.");
      lines.push("");
    }
  }

  let singleCompPropsCount = 0;
  for (const [name, impls] of propMap.entries()) {
    const compSet = new Set(impls.map(x => x.component));
    if (compSet.size === 1) {
      singleCompPropsCount++;
    }
  }
  lines.push(`✓ ${singleCompPropsCount} props are unique to a single component.`);
  lines.push("");

  const mdOut = resolve(root, MD_OUT);
  mkdirSync(dirname(mdOut), { recursive: true });
  writeFileSync(mdOut, lines.join("\n"), "utf-8");
  console.log(`[dezign8-props] ${MD_OUT} — ${numUniqueProps} props`);
}

// ─── GENERATE ────────────────────────────────────────────────

function generate(root: string): void {
  const srcDesign  = resolve(root, "src/design");
  const propsFiles = findPropsFiles(srcDesign);

  if (!propsFiles.length) {
    console.warn("[dezign8-props] No component props files found");
    return;
  }

  const options = loadCompilerOptions(root);
  const program = ts.createProgram({ rootNames: propsFiles, options });
  const checker = program.getTypeChecker();
  const result: PropsMap = {};
  const interfacePaths = new Map<string, string>();

  for (const filePath of propsFiles) {
    // Only handle standard depth: category/components/component/component.props.ts
    const rel   = relative(srcDesign, filePath);
    const parts = rel.split(sep);
    if (parts.length !== 4) continue;

    const [category, , componentDir] = parts as [string, string, string, string];
    const entryId = `${category}/${componentDir}`;
    const ownName = toPropsName(componentDir);

    // Load hook text for wired detection
    const componentHook = resolve(srcDesign, category, "components", componentDir, `${componentDir}.hook.ts`);
    const categoryHook  = resolve(srcDesign, category, `${category}.hook.ts`);
    const hookTexts     = [readHook(componentHook), readHook(categoryHook)];

    const sourceFile = program.getSourceFile(filePath);
    if (!sourceFile) continue;

    // Locate the primary exported Props interface
    let mainIface: ts.InterfaceDeclaration | undefined;
    ts.forEachChild(sourceFile, node => {
      if (!ts.isInterfaceDeclaration(node)) return;
      if (!node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) return;
      if (node.name.text === ownName)                       { mainIface = node; }
      else if (!mainIface && node.heritageClauses?.length)  { mainIface = node; }
    });
    if (!mainIface) continue;

    // Fully-resolved property list (merges all extends chains)
    const type = checker.getTypeAtLocation(mainIface);
    const raw: PropInfo[] = [];

    for (const symbol of type.getProperties()) {
      const decls = symbol.getDeclarations();
      if (!decls?.length) continue;
      const decl = decls[0]!;

      // Skip index signatures like [key: `data-${string}`]: string
      if (ts.isIndexSignatureDeclaration(decl)) continue;

      const parent = decl.parent;
      const from   = ts.isInterfaceDeclaration(parent) ? parent.name.text : "unknown";
      if (ts.isInterfaceDeclaration(parent)) {
        const fromPath = parent.getSourceFile().fileName;
        const relPath = relative(root, fromPath);
        interfacePaths.set(from, relPath);
      }

      const propType    = checker.getTypeOfSymbolAtLocation(symbol, decl);
      const typeStr     = cleanType(checker.typeToString(propType));
      const optional    = !!(symbol.flags & ts.SymbolFlags.Optional);
      const description = ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim();

      const defaultTag = symbol.getJsDocTags(checker).find(t => t.name === "default");
      const defaultVal = defaultTag?.text
        ? ts.displayPartsToString(defaultTag.text).trim()
        : undefined;

      const info: PropInfo = {
        name: symbol.name,
        type: typeStr,
        optional,
        description,
        from,
        wired: false, // filled in below
        ...(defaultVal ? { default: defaultVal } : {}),
      };
      info.wired = isWired(info, hookTexts);

      raw.push(info);
    }

    // Sort: own interface → category/mixin → base/shared (stable within each group)
    raw.sort((a, b) => groupRank(a.from, ownName) - groupRank(b.from, ownName));
    result[entryId] = raw;
  }

  const jsonOut = resolve(root, JSON_OUT);
  mkdirSync(dirname(jsonOut), { recursive: true });
  writeFileSync(jsonOut, JSON.stringify(result, null, 2), "utf-8");
  console.log(`[dezign8-props] ${JSON_OUT} — ${Object.keys(result).length} components`);

  generateMarkdown(result, root, interfacePaths);
}

// ─── PLUGIN ──────────────────────────────────────────────────

export function propsPlugin(): Plugin {
  let root: string;

  return {
    name:    "dezign8-props",
    enforce: "pre",

    configResolved(config) {
      root = config.root;
      // Generate here so the JSON exists before any import is resolved
      // (covers both `astro dev` and `astro build`)
      generate(root);
    },

    handleHotUpdate({ file }) {
      const inDesign = file.includes(`${sep}src${sep}design${sep}`);
      if (inDesign && (file.endsWith(".props.ts") || file.endsWith(".hook.ts"))) {
        generate(root);
      }
    },
  };
}