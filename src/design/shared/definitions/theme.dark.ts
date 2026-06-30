// ─── LAYER 2: DARK THEME ──────────────────────────────────────
// selector: [data-theme="dark"]

export const DARK_THEME_TOKENS: Record<string, string> = {
  // Backgrounds — inverted elevation: lower number = deeper/darker
  "bg--image": "url('/texture-dark.png')",
  "bg--0": "var(--slate-30)",
  "bg--1": "var(--slate-28)",
  "bg--2": "var(--slate-26)", 
  "bg--3": "var(--slate-24)",
  "bg--4": "var(--slate-22)", 
  "bg--5": "var(--slate-20)",

  "bg--0-glass": "color-mix(in oklch, var(--slate-30) 88%, transparent)",
  "bg--1-glass": "color-mix(in oklch, var(--slate-28) 82%, transparent)",
  "bg--2-glass": "color-mix(in oklch, var(--slate-27) 74%, transparent)",
  "bg--3-glass": "color-mix(in oklch, var(--slate-26) 66%, transparent)",
  "bg--4-glass": "color-mix(in oklch, var(--slate-25) 60%, transparent)",
  "bg--5-glass": "color-mix(in oklch, var(--slate-24) 52%, transparent)",

  // Text
  "text--primary":      "var(--cyan-08)", 
  "text--secondary":  "var(--purple-03)",
  "text--accent":       "var(--lime-06)",  
  "text--tertiary": "var(--text--accent)", 
  // ======================================== //
  "text--muted":       "var(--slate-11)",
  "text--disabled":    "var(--slate-19)", 
  "text--inverse":     "var(--slate-28)", 
  "text--on-color":    "var(--slate-30)", 
  // ======================================== //
  "text--layer-1":     "var(--slate-04)", 
  "text--layer-2":     "var(--slate-03)",
  "text--layer-3":     "var(--slate-03)", 
  "text--layer-4":     "var(--slate-02)",
  "text--layer-5":     "var(--slate-02)", 
  "text--layer-6":     "var(--slate-01)",
  
  // Borders  =================================================================== //
  "border--subtle":    "color-mix(in oklch, var(--slate-01) 57%, transparent)",
  "border--default":   "color-mix(in oklch, var(--slate-01) 62%, transparent)",
  "border--strong":    "color-mix(in oklch, var(--slate-01) 40%, transparent)",
  "border--focus":       "var(--cyan-13)",
  "border--primary":     "var(--cyan-10)",
  "border--secondary": "var(--purple-13)",
  "border--tertiary":    "var(--lime-13)",
  "border--layer-1":   "var(--border--subtle)", 
  "border--layer-2":   "var(--border--subtle)",
  "border--layer-3":   "var(--border--default)", 
  "border--layer-4":   "var(--border--default)",
  "border--layer-5":   "var(--border--strong)", 
  "border--layer-6":   "var(--border--strong)",


  // Primary — Cyan (accents glow in dark mode)
  "primary--subtle": "color-mix(in oklch, var(--cyan-16) 10%, var(--slate-29))",
  "primary--muted":  "color-mix(in oklch, var(--cyan-16) 18%, var(--slate-27))",
  "primary--base":   "var(--cyan-17)", 
  "primary--vivid":  "var(--cyan-12)",
  "primary--deep":   "var(--cyan-19)", 
  "primary--border": "var(--cyan-19)",
  "primary--text":   "var(--text--primary)",

  // Secondary — Purple
  "secondary--subtle": "color-mix(in oklch, var(--purple-14) 12%, var(--slate-29))",
  "secondary--muted":  "color-mix(in oklch, var(--purple-14) 20%, var(--slate-27))",
  "secondary--base":   "var(--purple-14)", 
  "secondary--vivid":  "var(--purple-11)",
  "secondary--deep":   "var(--purple-08)", 
  "secondary--border": "var(--purple-15)",
  "secondary--text":   "var(--text--secondary)",

  // Accent — Lime
  "accent--subtle": "color-mix(in oklch, var(--lime-16) 10%, var(--slate-29))",
  "accent--muted":  "color-mix(in oklch, var(--lime-16) 18%, var(--slate-27))",
  "accent--base":   "var(--lime-15)", 
  "accent--vivid":  "var(--lime-12)",
  "accent--deep":   "var(--lime-09)", 
  "accent--border": "var(--lime-19)",
  "accent--text":   "var(--lime-10)",

  // Tertiary — Lime
  "tertiary--subtle": "color-mix(in oklch, var(--lime-16) 10%, var(--slate-29))",
  "tertiary--muted":  "color-mix(in oklch, var(--lime-16) 18%, var(--slate-27))",
  "tertiary--base":   "var(--lime-15)", 
  "tertiary--vivid":  "var(--lime-12)",
  "tertiary--deep":   "var(--lime-09)", 
  "tertiary--border": "var(--lime-19)",
  "tertiary--text":   "var(--lime-10)",

  // Success — vivid: 3 lighter than base; deep: 6 lighter (glow on dark bg)
  "success--subtle": "color-mix(in oklch, var(--lime-18) 12%, var(--slate-29))",
  "success--muted":  "color-mix(in oklch, var(--lime-18) 20%, var(--slate-27))",
  "success--base":   "var(--lime-15)", 
  "success--vivid":  "var(--lime-12)",
  "success--deep":   "var(--lime-09)", 
  "success--border": "var(--lime-19)",
  "success--text":   "var(--lime-10)",

  // Danger — vivid: 3 lighter than base; deep: 6 lighter (glow on dark bg)
  "danger--subtle": "color-mix(in oklch, var(--red-16) 12%, var(--slate-29))",
  "danger--muted":  "color-mix(in oklch, var(--red-16) 20%, var(--slate-27))",
  "danger--base":   "var(--red-15)",  
  "danger--vivid":  "var(--red-12)",
  "danger--deep":   "var(--red-09)",  
  "danger--border": "var(--red-19)",
  "danger--text":   "var(--red-09)",

  // Warning — vivid: 3 lighter than base; deep: 6 lighter (glow on dark bg)
  "warning--subtle": "color-mix(in oklch, var(--orange-14) 12%, var(--slate-29))",
  "warning--muted":  "color-mix(in oklch, var(--orange-14) 20%, var(--slate-27))",
  "warning--base":   "var(--orange-13)", 
  "warning--vivid":  "var(--orange-10)",
  "warning--deep":   "var(--orange-07)", 
  "warning--border": "var(--orange-17)",
  "warning--text":   "var(--orange-08)",

  // Info — vivid: 3 lighter than base; deep: 6 lighter (glow on dark bg)
  "info--subtle": "color-mix(in oklch, var(--cyan-16) 12%, var(--slate-29))",
  "info--muted":  "color-mix(in oklch, var(--cyan-16) 20%, var(--slate-27))",
  "info--base":   "var(--cyan-14)", 
  "info--vivid":  "var(--cyan-11)",
  "info--deep":   "var(--cyan-08)", 
  "info--border": "var(--cyan-18)",
  "info--text":   "var(--cyan-09)",

  // Interactive overlays
  "overlay--hover":    "color-mix(in oklch, var(--slate-01) 5%,  transparent)",
  "overlay--active":   "color-mix(in oklch, var(--slate-01) 10%, transparent)",
  "overlay--selected": "color-mix(in oklch, var(--cyan-15)  14%, transparent)",
  "overlay--scrim":    "color-mix(in oklch, var(--slate-30) 70%, transparent)",

  // Focus
  "focus-ring": "0 0 0 3px color-mix(in oklch, var(--cyan-14) 38%, transparent)",

  // Shadows — higher opacity in dark mode
  "shadow--xs": "0 1px 2px color-mix(in oklch, var(--slate-30) 30%, transparent)",
  "shadow--sm": "0 1px 3px color-mix(in oklch, var(--slate-30) 40%, transparent), 0 1px 2px color-mix(in oklch, var(--slate-30) 30%, transparent)",
  "shadow--md": "0 4px 8px color-mix(in oklch, var(--slate-30) 50%, transparent), 0 2px 4px color-mix(in oklch, var(--slate-30) 38%, transparent)",
  "shadow--lg": "0 12px 16px color-mix(in oklch, var(--slate-30) 58%, transparent), 0 4px 6px color-mix(in oklch, var(--slate-30) 44%, transparent)",
  "shadow--xl": "0 20px 24px color-mix(in oklch, var(--slate-30) 64%, transparent), 0 8px 12px color-mix(in oklch, var(--slate-30) 50%, transparent)",
  "shadow--inset": "inset 0 2px 4px color-mix(in oklch, var(--slate-30) 50%, transparent)",

  // Glass
  "glass--highlight": "color-mix(in oklch, white 6%, transparent)",
  "glass--shadow": "inset 0 1px 0 color-mix(in oklch, white 6%, transparent), 0 8px 32px color-mix(in oklch, var(--slate-30) 56%, transparent)",

  // Disabled
  "opacity--disabled": "0.34",
};