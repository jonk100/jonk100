import type { APIRoute } from "astro";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export const prerender = false;

const CHORDS_DIR = path.join(process.cwd(), "src/content/chords");

type CreateChordPayload = {
  slug: string;
  displayName: string;
  voicingLabel: string;
  baseFret: number;
  fingering: number[];
  frets: number[];
  notes?: string[];
  barre?: {
    finger: number;
    fret: number;
    strings: [number, number];
  };
  alternateNames?: string[];
  enharmonic?: string;
};

function isFiniteNumber(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n);
}

function parseNumberArray(value: FormDataEntryValue | null): number[] | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return null;
  }
  if (!Array.isArray(parsed)) return null;
  const nums = parsed.filter((v) => v !== null && v !== undefined);
  if (!nums.every((v) => isFiniteNumber(v))) return null;
  return nums as number[];
}

function parseStringArray(value: FormDataEntryValue | null): string[] | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return null;
  }
  if (!Array.isArray(parsed)) return null;
  if (!parsed.every((v) => typeof v === "string")) return null;
  return parsed as string[];
}

function parseOptionalString(value: FormDataEntryValue | null): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parseOptionalJson<T>(value: FormDataEntryValue | null): T | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (trimmed.length === 0) return undefined;
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    return undefined;
  }
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

    const slug = String(data.get("slug") ?? "").trim();
    const displayName = String(data.get("displayName") ?? "").trim();
    const voicingLabel = String(data.get("voicingLabel") ?? "").trim();

    const baseFretRaw = String(data.get("baseFret") ?? "").trim();
    const baseFret = Number(baseFretRaw);

    const fingering = parseNumberArray(data.get("fingering"));
    const frets = parseNumberArray(data.get("frets"));

    const notes = parseStringArray(data.get("notes")) ?? undefined;
    const alternateNames = parseStringArray(data.get("alternateNames")) ?? undefined;
    const enharmonic = parseOptionalString(data.get("enharmonic"));

    const barre = parseOptionalJson<CreateChordPayload["barre"]>(data.get("barre"));

    if (!slug || !displayName || !voicingLabel) {
      return new Response(JSON.stringify({ ok: false, error: "slug, displayName, and voicingLabel are required" }), {
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

    if (!Number.isInteger(baseFret) || baseFret < 1) {
      return new Response(JSON.stringify({ ok: false, error: "baseFret must be an integer >= 1" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    if (!fingering || fingering.length !== 6) {
      return new Response(JSON.stringify({ ok: false, error: "fingering must be a JSON array of 6 numbers" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    if (!frets || frets.length !== 6) {
      return new Response(JSON.stringify({ ok: false, error: "frets must be a JSON array of 6 numbers" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    if (notes && notes.length !== 6) {
      return new Response(JSON.stringify({ ok: false, error: "notes must be a JSON array of 6 strings (or omitted)" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const payload: CreateChordPayload = {
      slug,
      displayName,
      voicingLabel,
      baseFret,
      fingering,
      frets,
      notes,
      barre,
      alternateNames,
      enharmonic,
    };

    const frontmatter: Record<string, unknown> = {
      displayName: payload.displayName,
      voicingLabel: payload.voicingLabel,
      baseFret: payload.baseFret,
      fingering: payload.fingering,
      frets: payload.frets,
    };

    if (payload.barre) frontmatter.barre = payload.barre;
    if (payload.notes) frontmatter.notes = payload.notes;
    if (payload.alternateNames) frontmatter.alternateNames = payload.alternateNames;
    if (payload.enharmonic) frontmatter.enharmonic = payload.enharmonic;

    const mdx = matter.stringify("", frontmatter);

    const allowWrite = (process.env.ALLOW_CHORD_WRITE ?? "").toLowerCase() === "true";
    if (!allowWrite) {
      return new Response(
        JSON.stringify({ ok: true, wroteFile: false, slug: payload.slug, mdx }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    await fs.mkdir(CHORDS_DIR, { recursive: true });

    const filePath = path.join(CHORDS_DIR, `${payload.slug}.mdx`);
    const exists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (exists) {
      return new Response(JSON.stringify({ ok: false, error: "Chord file already exists", slug: payload.slug }), {
        status: 409,
        headers: { "content-type": "application/json" },
      });
    }

    await fs.writeFile(filePath, mdx, "utf-8");

    return new Response(JSON.stringify({ ok: true, wroteFile: true, slug: payload.slug, filePath }), {
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
