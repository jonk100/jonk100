/**
 * scripts/generate-icons.ts
 * Generates a typed registry for design-system SVG icons.
 * - Scans /src/design/icons for SVG files
 * - Generates a kebab-case → SvgComponent registry
 * - Uses a dedicated Icon namespace for internal imports
 * - Produces a safe SvgName union type
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ICON_DIR = path.join(ROOT, "src/design/shared/icons");
const OUTPUT_FILE = path.join(ICON_DIR, "index.ts");

const files = fs
  .readdirSync(ICON_DIR)
  .filter((f: string) => f.endsWith(".svg"))
  .sort();

const imports: string[] = [];
const entries: string[] = [];

for (const file of files) {
  const name = file.replace(".svg", "");

  /**
   * Convert kebab-case filename into a safe internal import name.
   * We DO NOT expose this externally.
   *
   * example:
   * card-header → IconCardHeader
   */
  const importName = name
    .split("-")
    .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  const safeImportName = `Icon${importName}`;

  imports.push(`import ${safeImportName} from './${file}';`);

  entries.push(`  '${name}': ${safeImportName}`);
}

const output = `/**
 * src/design/icons/index.ts
 * AUTO-GENERATED FILE
 * DO NOT EDIT MANUALLY
 *
 * Design System Icon Registry
 *
 * This file defines the public icon contract for the design system.
 *
 * Architecture:
 * - SVG files are stored in /src/design/shared/icons as the source of truth
 * Each SVG is transformed into an importable Astro SVG component
 * - Internal component names are prefixed with "Icon" to avoid collision
 *   with UI components (e.g. CardHeader, TableRow)
 * - Public API uses kebab-case string identifiers
 *
 * Layers:
 * - UI Components:       CardHeader, TableRow, ButtonGroup
 * - Icon Components:     IconCardHeader, IconTableRow, IconButtonGroup
 * - Public Icon API:     'card-header', 'table-row', 'button-group'
 *
 * Usage:
 * <Svg name="card-header" />
 *
 * Type Safety:
 * - SvgName is derived from the registry keys
 * - Invalid icon names fail at compile time
 * Rules:
 * - Do not manually edit this file
 * - Treat this file as read-only output of the icon generation process
 * - Add new icons only by adding SVG files to /src/design/shared/icons
 * - Run the generator script to update this registry
 */

import type { SvgComponent } from 'astro/types';

${imports.join("\n")}

export const icons = {
${entries.join(",\n")}
} satisfies Record<string, SvgComponent>;

export type SvgName = keyof typeof icons;
`;

fs.writeFileSync(OUTPUT_FILE, output, "utf8");

console.log(`Generated ${files.length} icons`);
