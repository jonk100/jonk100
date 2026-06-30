// design/shared/motion/motion.utils.ts

import type { MotionAttrs, MotionPhase, ParsedAnim, ParsedPhase } from "./motion.types";

// ── Parser ─────────────────────────────────────────────────────────────────

/** Splits on the boundary immediately before every phase keyword. */
const PHASE_BOUNDARY = /(?=(?:enter|exit|idle):)/;

function parseMotion(m: string): ParsedPhase[] {
  return m
    .split(PHASE_BOUNDARY)
    .map((seg) => seg.trim())
    .filter(Boolean)
    .flatMap((seg): ParsedPhase[] => {
      const colon = seg.indexOf(":");
      if (colon === -1) return [];

      const phase = seg.slice(0, colon).trim() as MotionPhase;
      if (phase !== "enter" && phase !== "exit" && phase !== "idle") return [];

      const anims: ParsedAnim[] = seg
        .slice(colon + 1)
        .trim()
        .split(",")
        .map((a) => {
          const [name, rawDur = "300", rawDelay = "0"] = a.trim().split("/");
          return { name: (name ?? "").trim(), duration: +rawDur, delay: +rawDelay, phase };
        });

      return [{ phase, anims }];
    });
}

// ── Builder ────────────────────────────────────────────────────────────────

function buildAnim(a: ParsedAnim): string {
  const isInfinite = a.phase === "idle";
  const iter       = isInfinite ? "infinite" : "1";
  const fill       = isInfinite ? "none"     : "both";
  return `m-${a.phase}-${a.name} ${a.duration}ms ease-out ${a.delay}ms ${iter} ${fill}`;
}

// ── Public API ─────────────────────────────────────────────────────────────

export function getMotionAttrs(m: string): MotionAttrs {
  const isScroll = m.includes("scroll");
  const cleanM = m.replace(/\b(scroll)\b/g, "").trim();

  const phases    = parseMotion(cleanM);
  const enterPhase = phases.find((p) => p.phase === "enter");
  const exitPhase  = phases.find((p) => p.phase === "exit");
  const idlePhase  = phases.find((p) => p.phase === "idle");

  // Mount animations: enter runs once, idle loops forever
  const mountAnims: ParsedAnim[] = [
    ...(enterPhase?.anims ?? []),
    ...(idlePhase?.anims  ?? []),
  ];

  const enterAnimStr = mountAnims.map(buildAnim).join(", ");
  
  // If scroll, we don't inline the enterStyle, we defer it to data attributes
  const enterStyle =
    !isScroll && mountAnims.length > 0
      ? `animation: ${enterAnimStr}`
      : undefined;

  const exitAttrs: Record<string, string> = {};
  
  if (mountAnims.length > 0) {
    exitAttrs["data-m-enter"] = enterAnimStr;
  }
  
  if (isScroll) {
    exitAttrs["data-m-scroll"] = "";
    if (mountAnims.length > 0) {
      // Start hidden so it can fade/animate in via intersection observer
      exitAttrs["data-m-hidden"] = "true";
    }
  }

  if (exitPhase) {
    const exitAnimStr = exitPhase.anims.map(buildAnim).join(", ");
    const maxDur      = Math.max(...exitPhase.anims.map((a) => a.duration + a.delay));
    exitAttrs["data-m-exit"]     = exitAnimStr;
    exitAttrs["data-m-exit-dur"] = String(maxDur);
  }

  return { enterStyle, exitAttrs };
}
