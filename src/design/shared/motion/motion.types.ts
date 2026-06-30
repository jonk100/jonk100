// design/shared/motion/motion.types.ts

// ── Phase ──────────────────────────────────────────────────────────────────

export type MotionPhase = "enter" | "exit" | "idle";

// ── Animation name registries (informational; m prop is untyped string) ────

/** Animations valid for enter: phase */
export type EnterName =
  | "slideUp"    | "slideDown"   | "slideLeft"   | "slideRight"
  | "fadeIn"
  | "stretchUp"  | "stretchDown" | "stretchLeft" | "stretchRight"
  | "spinIn"     | "spinUp"      | "spinDown"    | "spinLeft"    | "spinRight"
  | "shakeIn"
  | "blinkIn"    | "blinkUp"     | "blinkDown"   | "blinkLeft"   | "blinkRight"
  | "bounceUp"   | "bounceDown"  | "bounceLeft"  | "bounceRight"
  | "appear";

/** Animations valid for exit: phase */
export type ExitName =
  | "slideUp"    | "slideDown"   | "slideLeft"   | "slideRight"
  | "fadeOut"
  | "stretchUp"  | "stretchDown" | "stretchLeft" | "stretchRight"
  | "spinOut"    | "spinUp"      | "spinDown"    | "spinLeft"    | "spinRight"
  | "shakeOut"
  | "blinkOut"   | "blinkUp"     | "blinkDown"   | "blinkLeft"   | "blinkRight"
  | "bounceUp"   | "bounceDown"  | "bounceLeft"  | "bounceRight"
  | "disappear";

/** Animations valid for idle: phase (infinite loops) */
export type IdleName =
  | "shakeInfinite"
  | "shakeOnOff"
  | "bounceInPlace"
  | "shakeInPlace";

// ── Internal parsed shapes ─────────────────────────────────────────────────

export interface ParsedAnim {
  name:     string;
  duration: number; // ms
  delay:    number; // ms
  phase:    MotionPhase;
}

export interface ParsedPhase {
  phase: MotionPhase;
  anims: ParsedAnim[];
}

export interface MotionAttrs {
  /** Inline animation style for enter + idle (applied on mount). */
  enterStyle?: string | undefined;
  /** data-* attrs for JS-triggered exit animation. */
  exitAttrs:   Record<string, string>;
}

// ── Public prop type ───────────────────────────────────────────────────────

/**
 * Motion prop syntax: `{phase}:{name}[/{duration}[/{delay}]][,…] […]`
 *
 * - **phase**    — `enter` | `exit` | `idle`
 * - **name**     — animation name (see EnterName / ExitName / IdleName)
 * - **duration** — ms, optional (default 300)
 * - **delay**    — ms, optional (default 0)
 * - **`,`**      — chains compound animations within a phase
 * - **` `**      — separates phases
 *
 * @example
 * m="enter:slideUp/200/0"
 * m="enter:slideUp/200/0 exit:fadeOut/200/0"
 * m="enter:slideUp/200/0 exit:shakeOut/150/0,slideLeft/200/50"
 * m="idle:shakeInfinite/800"
 */
export type MotionProp = string;
