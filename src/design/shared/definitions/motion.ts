export const MOTION_TOKEN_DEFINITIONS: Record<string, string> = {
    // Duration
  "duration--instant": "var(--duration-50)",   "duration--fast":   "var(--duration-100)",
  "duration--base":    "var(--duration-200)",  "duration--slow":   "var(--duration-300)",
  "duration--slower":  "var(--duration-500)",  "duration--crawl":  "var(--duration-1000)",

  // Easing
  "ease--out":    "var(--ease-out)",    "ease--in-out": "var(--ease-in-out)",
  "ease--spring": "var(--ease-spring)", "ease--bounce": "var(--ease-bounce)",

  // Transition shorthands
  "transition--instant": "var(--duration--instant) var(--ease--out)",
  "transition--fast":    "var(--duration--fast)    var(--ease--out)",
  "transition--base":    "var(--duration--base)    var(--ease--out)",
  "transition--slow":    "var(--duration--slow)    var(--ease--out)",
  "transition--spring":  "var(--duration--slow)    var(--ease--spring)",
}