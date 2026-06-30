// ─── LAYER 2: LIGHT THEME ─────────────────────────────────────
// selector: :root, [data-theme="light"]

export const LIGHT_THEME_TOKENS: Record<string, string> = {
  // Backgrounds
  "bg--image": "url('/texture-3.png')",
  "bg--0": "var(--slate-01)",
  "bg--1": "var(--slate-02)",
  "bg--2": "var(--slate-03)", 
  "bg--3": "var(--slate-04)",
  "bg--4": "var(--slate-05)", 
  "bg--5": "var(--slate-06)",

  "bg--0-glass": "color-mix(in oklch, var(--slate-01) 90%, transparent)",
  "bg--1-glass": "color-mix(in oklch, var(--slate-02) 85%, transparent)",
  "bg--2-glass": "color-mix(in oklch, var(--slate-03) 80%, transparent)",
  "bg--3-glass": "color-mix(in oklch, var(--slate-04) 70%, transparent)",
  "bg--4-glass": "color-mix(in oklch, var(--slate-05) 65%, transparent)",
  "bg--5-glass": "color-mix(in oklch, var(--slate-06) 60%, transparent)",

  // Text
  "text--layer-1":   "var(--slate-28)", 
  "text--layer-2":   "var(--slate-26)", 
  "text--layer-3":   "var(--slate-24)", 
  "text--layer-4":   "var(--slate-22)", 
  "text--layer-5":   "var(--slate-20)", 
  "text--layer-6":   "var(--slate-18)",

  "text--primary":   "var(--cyan-25)", 
  "text--secondary":  "var(--slate-22)",
  "text--accent":    "var(--lime-26)", 
  "text--tertiary":   "var(--text--accent)", 

  "text--disabled":  "var(--slate-11)", 
  "text--muted":     "var(--slate-19)",
  "text--inverse":   "var(--slate-01)", 
  "text--on-color":  "var(--slate-30)",


  // Borders
  "border--subtle":    "var(--slate-05)", 
  "border--default":   "var(--slate-08)",
  "border--strong":    "var(--slate-13)", 
  "border--focus":     "var(--cyan-18)",
  "border--layer-1":   "var(--border--subtle)", 
  "border--layer-2":   "var(--border--subtle)",
  "border--layer-3":   "var(--border--default)",
  "border--layer-4":   "var(--border--default)",
  "border--layer-5":   "var(--border--strong)", 
  "border--layer-6":   "var(--border--strong)",
  "border--primary":   "var(--cyan-13)",
  "border--secondary": "var(--purple-13)",
  "border--tertiary":  "var(--lime-13)",

  // Primary — Cyan
  "primary--subtle": "var(--cyan-03)",
  "primary--muted":  "var(--cyan-06)",
  "primary--base":   "var(--cyan-16)",
  "primary--vivid":  "var(--cyan-14)",
  "primary--deep":   "var(--cyan-22)",
  "primary--border": "var(--cyan-11)",
  "primary--text":   "var(--cyan-22)",

  // Secondary — Purple
  "secondary--subtle": "var(--purple-03)", 
  "secondary--muted":  "var(--purple-06)",
  "secondary--base":   "var(--purple-10)", 
  "secondary--vivid":  "var(--purple-14)",
  "secondary--deep":   "var(--purple-22)", 
  "secondary--border": "var(--purple-11)",
  "secondary--text":   "var(--purple-22)",

  // Accent — Lime
  "accent--subtle": "var(--lime-03)", 
  "accent--muted":  "var(--lime-06)",
  "accent--base":   "var(--lime-16)", 
  "accent--vivid":  "var(--lime-14)",
  "accent--deep":   "var(--lime-22)", 
  "accent--border": "var(--lime-11)",
  "accent--text":   "var(--lime-24)",

  // Tertiary — Lime (shares palette with accent; accent=decorative, tertiary=brand)
  "tertiary--subtle": "var(--lime-03)", 
  "tertiary--muted":  "var(--lime-06)",
  "tertiary--base":   "var(--lime-16)", 
  "tertiary--vivid":  "var(--lime-14)",
  "tertiary--deep":   "var(--lime-22)", 
  "tertiary--border": "var(--lime-11)",
  "tertiary--text":   "var(--lime-24)",

  // Success — vivid: 3 lighter than base; deep: 6 darker than base
  "success--subtle": "var(--lime-03)",  
  "success--muted":  "var(--lime-06)",
  "success--base":   "var(--lime-18)",  
  "success--vivid":  "var(--lime-15)",
  "success--deep":   "var(--lime-24)",  
  "success--border": "var(--lime-12)",
  "success--text":   "var(--lime-24)",

  // Danger — vivid: 2 lighter than base; deep: 6 darker than base
  "danger--subtle": "var(--red-03)",   
  "danger--muted":  "var(--red-06)",
  "danger--base":   "var(--red-16)",   
  "danger--vivid":  "var(--red-14)",
  "danger--deep":   "var(--red-22)",   
  "danger--border": "var(--red-11)",
  "danger--text":   "var(--red-22)",

  // Warning — vivid: 2 lighter than base; deep: 6 darker than base
  "warning--subtle": "var(--orange-03)", 
  "warning--muted":  "var(--orange-06)",
  "warning--base":   "var(--orange-14)", 
  "warning--vivid":  "var(--orange-12)",
  "warning--deep":   "var(--orange-20)", 
  "warning--border": "var(--orange-10)",
  "warning--text":   "var(--orange-22)",

  // Info — vivid: 2 lighter than base; deep: 5 darker than base
  "info--subtle": "var(--cyan-03)", 
  "info--muted":  "var(--cyan-06)",
  "info--base":   "var(--cyan-14)", 
  "info--vivid":  "var(--cyan-12)",
  "info--deep":   "var(--cyan-19)", 
  "info--border": "var(--cyan-10)",
  "info--text":   "var(--cyan-22)",

  // Interactive overlays
  "overlay--hover":    "color-mix(in oklch, var(--slate-30) 5%,  transparent)",
  "overlay--active":   "color-mix(in oklch, var(--slate-30) 10%, transparent)",
  "overlay--selected": "color-mix(in oklch, var(--cyan-16)  12%, transparent)",
  "overlay--scrim":    "color-mix(in oklch, var(--slate-30) 48%, transparent)",

  // Focus
  "focus-ring": "0 0 0 3px color-mix(in oklch, var(--cyan-16) 32%, transparent)",

  // Shadows
  "shadow--xs": "0 1px 2px color-mix(in oklch, var(--slate-30) 4%, transparent)",
  "shadow--sm": "0 1px 3px color-mix(in oklch, var(--slate-30) 7%, transparent), 0 1px 2px color-mix(in oklch, var(--slate-30) 5%, transparent)",
  "shadow--md": "0 4px 8px color-mix(in oklch, var(--slate-30) 8%, transparent), 0 2px 4px color-mix(in oklch, var(--slate-30) 6%, transparent)",
  "shadow--lg": "0 12px 16px color-mix(in oklch, var(--slate-30) 9%, transparent), 0 4px 6px color-mix(in oklch, var(--slate-30) 6%, transparent)",
  "shadow--xl": "0 20px 24px color-mix(in oklch, var(--slate-30) 10%, transparent), 0 8px 12px color-mix(in oklch, var(--slate-30) 7%, transparent)",
  "shadow--inset": "inset 0 2px 4px color-mix(in oklch, var(--slate-30) 8%, transparent)",

  // Glass
  "glass--highlight": "color-mix(in oklch, white 80%, transparent)",
  "glass--shadow": "inset 0 1px 0 color-mix(in oklch, white 80%, transparent), 0 8px 32px color-mix(in oklch, var(--slate-30) 8%, transparent)",

  // Disabled
  "opacity--disabled": "0.42",
};