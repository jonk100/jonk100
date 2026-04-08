import type { APIRoute } from "astro";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export const prerender = false;

const SONGS_DIR = path.join(process.cwd(), "src/content/songs");

type CreateSongPayload = {
  title: string;
  slug: string;
  keyRoot: string;
  keyMode: string;
  tempo?: number;
  timeSignatureTop: number;
  timeSignatureBottom: number;
  chordVoicings: string[];
  structure: string[];
  sections: Array<{
    name: string;
    chords: string[];
    bars: number;
    repeats?: number;
  }>;
  album?: string;
  chordSheetUrl?: string;
  status?: string;
  themes?: string[];
};

function parseStringArray(value: FormDataEntryValue | null): string[] | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (trimmed.length === 0) return undefined;
  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return undefined;
  }
  if (!Array.isArray(parsed)) return undefined;
  if (!parsed.every((v) => typeof v === "string")) return undefined;
  return parsed as string[];
}

function parseSections(value: FormDataEntryValue | null): CreateSongPayload["sections"] | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (trimmed.length === 0) return undefined;
  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return undefined;
  }
  if (!Array.isArray(parsed)) return undefined;
  
  // Validate each section has required fields
  const validSections = parsed.every((section) => {
    return typeof section === "object" && 
           section !== null &&
           typeof section.name === "string" &&
           Array.isArray(section.chords) &&
           typeof section.bars === "number" &&
           (section.repeats === undefined || typeof section.repeats === "number");
  });
  
  if (!validSections) return undefined;
  return parsed as CreateSongPayload["sections"];
}

function parseOptionalString(value: FormDataEntryValue | null): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function validateSlug(slug: string): string | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return "Slug must be lowercase alphanumerics + hyphens only";
  if (!slug.includes("-")) return "Slug must include a suffix like -0, -1, -2";
  if (slug.startsWith("-") || slug.endsWith("-")) return "Slug cannot start or end with a hyphen";
  return null;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let data: FormData;

    if (contentType.includes("application/json")) {
      // Accept JSON body for easier programmatic use
      let json: Record<string, unknown>;
      try {
        json = await request.json();
      } catch {
        return new Response(JSON.stringify({ ok: false, error: "Invalid JSON body" }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }
      data = new FormData();
      for (const [key, value] of Object.entries(json)) {
        if (typeof value === "string") {
          data.append(key, value);
        } else if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
          data.append(key, JSON.stringify(value));
        }
      }
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      data = await request.formData();
    } else {
      return new Response(JSON.stringify({ ok: false, error: "Unsupported content-type" }), {
        status: 415,
        headers: { "content-type": "application/json" },
      });
    }

    const title = String(data.get("title") ?? "").trim();
    let slug = String(data.get("slug") ?? "").trim();
    const keyRoot = String(data.get("keyRoot") ?? "").trim();
    const keyMode = String(data.get("keyMode") ?? "").trim();

    const tempoRaw = String(data.get("tempo") ?? "").trim();
    const tempo = tempoRaw ? Number(tempoRaw) : undefined;

    const timeSignatureTopRaw = String(data.get("timeSignatureTop") ?? "4");
    const timeSignatureTop = Number(timeSignatureTopRaw);

    const timeSignatureBottomRaw = String(data.get("timeSignatureBottom") ?? "4");
    const timeSignatureBottom = Number(timeSignatureBottomRaw);

    const chordVoicings = parseStringArray(data.get("chordVoicings"));
    const structure = parseStringArray(data.get("structure"));
    const sections = parseSections(data.get("sections"));

    const album = parseOptionalString(data.get("album"));
    const chordSheetUrl = parseOptionalString(data.get("chordSheetUrl"));
    const status = parseOptionalString(data.get("status"));
    const themes = parseStringArray(data.get("themes"));

    // Auto-generate slug from title if not provided
    if (!slug && title) {
      slug = title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        + '-0';
    }

    if (!title || !keyRoot || !keyMode || !chordVoicings || !structure || !sections) {
      return new Response(JSON.stringify({ 
        ok: false, 
        error: "title, keyRoot, keyMode, chordVoicings, structure, and sections are required" 
      }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const slugErr = validateSlug(slug);
    if (slugErr) {
      return new Response(JSON.stringify({ ok: false, error: slugErr }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    if (tempo && (tempo < 40 || tempo > 300)) {
      return new Response(JSON.stringify({ ok: false, error: "tempo must be between 40 and 300 BPM" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    if (timeSignatureTop < 1 || timeSignatureTop > 16 || timeSignatureBottom < 1 || timeSignatureBottom > 16) {
      return new Response(JSON.stringify({ ok: false, error: "time signature must be between 1/1 and 16/16" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const payload: CreateSongPayload = {
      title,
      slug,
      keyRoot,
      keyMode,
      tempo,
      timeSignatureTop,
      timeSignatureBottom,
      chordVoicings: chordVoicings!,
      structure: structure!,
      sections: sections!,
      album,
      chordSheetUrl,
      status,
      themes,
    };

    const frontmatter: Record<string, unknown> = {
      title: payload.title,
      keyRoot: payload.keyRoot,
      keyMode: payload.keyMode,
      timeSignatureTop: payload.timeSignatureTop,
      timeSignatureBottom: payload.timeSignatureBottom,
      chordVoicings: payload.chordVoicings,
      structure: payload.structure,
      sections: payload.sections,
    };

    if (payload.tempo) frontmatter.tempo = payload.tempo;
    if (payload.album) frontmatter.album = payload.album;
    if (payload.chordSheetUrl) frontmatter.chordSheetUrl = payload.chordSheetUrl;
    if (payload.status) frontmatter.status = payload.status;
    if (payload.themes) frontmatter.themes = payload.themes;

    const mdx = matter.stringify("", frontmatter);

    const allowWrite = (process.env.ALLOW_CHORD_WRITE ?? "").toLowerCase() === "true";
    if (!allowWrite) {
      return new Response(
        JSON.stringify({ ok: true, wroteFile: false, slug: payload.slug, mdx }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    await fs.mkdir(SONGS_DIR, { recursive: true });

    const filePath = path.join(SONGS_DIR, `${payload.slug}.mdx`);
    const exists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (exists) {
      return new Response(JSON.stringify({ ok: false, error: "Song file already exists", slug: payload.slug }), {
        status: 409,
        headers: { "content-type": "application/json" },
      });
    }

    await fs.writeFile(filePath, mdx, "utf-8");

    return new Response(JSON.stringify({ 
      ok: true, 
      wroteFile: true, 
      slug: payload.slug, 
      mdx,
      filePath 
    }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};
