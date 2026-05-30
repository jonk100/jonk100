# Design System Component Reference

Welcome to the Design System documentation for our portfolio! This document catalogs the available props, tokens, and visual variants for each UI primitive, interactive element, and layout utility.

All components are fully type-safe, built with Astro, and adhere to strict separation of **Design Tokens** and **Design Variants** as defined in `AGENTS.md`.

---

## Shared Property Types
These universal types are defined in [`src/types/variants.types.ts`](file:///home/jk/Code/portfolio/src/types/variants.types.ts):

| Type Name | Options | Description |
| :--- | :--- | :--- |
| `ComponentTheme` | `"primary" \| "ghost" \| "secondary" \| "outline" \| "accent" \| "default" \| "success" \| "warning" \| "danger"` | Semantic theme mapping for interactive/colored components |
| `Sizes` | `"xs" \| "sm" \| "md" \| "base" \| "lg" \| "xl" \| "icon" \| "icon-sm" \| "icon-lg"` | Font size and padding scaling for controls |
| `WrapperSize` | `"sm" \| "md" \| "lg" \| "xl" \| "full" \| "screen"` | Width constraints for wrappers and overlays |
| `ComponentRadius` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | Standard border-radius token boundaries |
| `SpacingScale` | `"none" \| "3xs" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "fluid"` | Layout gaps, margins, and paddings |
| `FrameVariant` | `"light" \| "dark" \| "glass" \| "polaroid" \| "minimal" \| "accent" \| "primary" \| "secondary" \| "none"` | Decorative container frame styles |
| `ComponentEffect` | `"screen" \| "glow" \| "grayscale" \| "glass" \| "shimmer"` | Advanced visual filter or motion treatments |
| `ComponentShape` | `"landscape" \| "portrait" \| "square" \| "circle" \| "none"` | Aspect-ratio and geometric cropping boundaries |
| `AnimationType` | `"slide-up" \| "slide-down" \| "fade-in" \| "pulse" \| "float" \| "spin" \| "none"` | Entrance or loop CSS micro-animations |
| `TextTone` | `"default" \| "muted" \| "subtle" \| "accent" \| "primary" \| "secondary" \| "danger" \| "success"` | Color tones for semantic text hierarchies |

---

## Interactive Playground: `<ComponentPreview>`
To showcase these components dynamically inside design sandboxes, utilize the `<ComponentPreview>` component. It implements an interactive tabbed display allowing users to toggle seamlessly between a living render and the raw source code.

```astro
---
import ComponentPreview from '../components/ui/primitives/ComponentPreview.astro';
import Button from '../components/ui/controls/Button.astro';

const codeSnippet = `<Button theme="primary">Click Me</Button>`;
---

<ComponentPreview code={codeSnippet} title="Action Button">
  <Button theme="primary">Click Me</Button>
</ComponentPreview>
```

---

## 1. Primitives (`src/components/ui/primitives/`)

### Frame
`Frame.astro` is a structural layout block used to crop assets into specific geometric shapes and aspect ratios.
- **Path**: [`src/components/ui/primitives/Frame.astro`](file:///home/jk/Code/portfolio/src/components/ui/primitives/Frame.astro)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` (Required) | `string` | — | The source path of the image. |
| `alt` (Required) | `string` | — | Alternative text for screen readers. |
| `shape` | `ComponentShape` | `"landscape"` | Geometric form and aspect ratio. |
| `radius` | `ComponentRadius` | — | Corner rounding constraint. |
| `class` | `string` | `""` | Additional CSS class names. |
| `class:list` | `Record<string, boolean> \| any[]` | `{}` | Astro dynamic class list object or array. |

#### Example 1: Common Usage (Standard Landscape Showcase Card)
A standard landscape image with rounded medium corners, typical for portfolio item thumbnails.
```astro
<Frame 
  src="/images/project-thumb.jpg" 
  alt="Portfolio Project Grid Image" 
  shape="landscape" 
  radius="md" 
/>
```

#### Example 2: Advanced Usage (Perfect Circle Visual Transformation)
A round avatar geometric frame displaying visual grayscale-to-color hover transformations.
```astro
<Frame 
  src="/images/profile.jpg" 
  alt="Team Profile Avatar Picture" 
  shape="circle" 
  radius="full" 
  class="effect--grayscale transition-all duration-300 hover:scale-105" 
/>
```

---

### Image
`Image.astro` is a high-performance image handler that integrates loading shimmers, load-failure fallbacks, click-to-zoom overlays, and modern caption positions.
- **Path**: [`src/components/ui/primitives/Image.astro`](file:///home/jk/Code/portfolio/src/components/ui/primitives/Image.astro)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` (Required) | `string` | — | The primary image URL. |
| `alt` (Required) | `string` | — | Descriptive alternative text. |
| `shape` | `ComponentShape` | `"landscape"` | The crop aspect ratio. |
| `radius` | `ComponentRadius` | — | Border radius bounds. |
| `fallbackSrc` | `string` | — | Failure fallback image URL. |
| `effects` | `ComponentEffect \| ComponentEffect[]` | `[]` | Graphical treatments (e.g., shimmer, glow, grayscale). |
| `loading` | `"eager" \| "lazy"` | `"lazy"` | Native browser loading behavior. |
| `frame` | `FrameVariant` | `"none"` | Decorative border/matte container frame. |
| `position` | `string` | `"center"` | CSS object-position (e.g., `"top center"`). |
| `fit` | `"cover" \| "contain" \| "fill" \| "none"` | `"cover"` | CSS object-fit layout constraint. |
| `zoomable` | `boolean` | `true` (if cover) | Enables standard click-to-zoom lightbox view. |
| `caption` | `string` | — | Caption text. |
| `captionPosition` | `"top" \| "bottom" \| "o-top" \| "o-bottom"` | — | Layout placement. `"o-"` stands for floating translucent overlay. |
| `captionAlign` | `"left" \| "center" \| "right"` | — | Horizontal text alignment. |
| `class` | `string` | `""` | Extensible custom CSS class. |
| `style` | `string \| Record<string, any>` | — | Inline style declarations. |

#### Example 1: Common Usage (Lazy-Loaded Image with Failure Fallback)
A standard portfolio image that lazily loads and replaces itself with a safe placeholder asset in case of a broken path.
```astro
<Image 
  src="/images/design-mockup.jpg" 
  alt="Digital Web Interface Mockup" 
  fallbackSrc="/images/placeholder-error.jpg" 
  loading="lazy" 
  radius="md" 
/>
```

#### Example 2: Advanced Usage (Translucent Floating Caption Overlay with Click-to-Zoom Lightbox)
An advanced card asset highlighting a premium loading shimmer effect, floating caption overlay, object fit parameters, and a click-to-zoom lightbox portal.
```astro
<Image 
  src="/images/hero-art.jpg" 
  alt="Concept digital artwork render" 
  shape="square" 
  effects="shimmer" 
  fit="cover" 
  position="center top" 
  zoomable={true} 
  caption="Creative Direction, 2026" 
  captionPosition="o-bottom" 
  captionAlign="center" 
  frame="polaroid" 
/>
```

---

### Link
`Link.astro` is a styled anchor wrapper that provides button-like variant themes, typography states, and accessibility bindings.
- **Path**: [`src/components/ui/primitives/Link.astro`](file:///home/jk/Code/portfolio/src/components/ui/primitives/Link.astro)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `href` (Required) | `string` | — | Destination anchor URL. |
| `label` | `string` | — | Inner link text (when present, renders a semantic `<Text>` wrapper). |
| `theme` | `ComponentTheme` | `"primary"` | Color styling category. |
| `tone` | `TextTone` | — | Color override for nested typography. |
| `size` | `Sizes` | `"base"` | Text sizing constraint. |
| `frame` | `FrameVariant` | `"none"` | Optional decorative frame wraps. |
| `target` | `string` | — | Link navigation target (e.g., `"_blank"`). |
| `rel` | `string` | — | Relationship description (e.g., `"noopener noreferrer"`). |
| `disabled` | `boolean` | `false` | Sets link behavior off and flags `aria-disabled="true"`. |
| `class` | `string` | `""` | Extensible custom classes. |
| `class:list` | `Record<string, boolean> \| any[]` | `{}` | Astro dynamic class bindings. |

#### Example 1: Common Usage (Themed Secondary Action)
A secondary themed text link commonly used inside paragraph bodies or footers.
```astro
<Link 
  href="/about" 
  label="Discover My Journey" 
  theme="secondary" 
/>
```

#### Example 2: Advanced Usage (Premium Minimal Frame Trigger with New-Tab Security)
An advanced action link styled with an external target tab, secure rel variables, disabled toggling support, and wrapped in a premium minimal border frame.
```astro
<Link 
  href="https://github.com/jk/portfolio" 
  theme="outline" 
  tone="accent" 
  size="lg" 
  frame="minimal" 
  target="_blank" 
  rel="noopener noreferrer" 
  aria-label="Access the open-source code repository on GitHub" 
>
  View Source Blueprints
</Link>
```

---

### Paper
`Paper.astro` is our core surface component, acting as a modular layout sheet that coordinates elevation layers, border-radius constraints, and standard micro-animations.
- **Path**: [`src/components/ui/primitives/Paper.astro`](file:///home/jk/Code/portfolio/src/components/ui/primitives/Paper.astro)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `layer` | `ComponentLayer` | `0` | Elevation depth from `"-1"` to `"5"`, governing shadows and backgrounds. |
| `radius` | `ComponentRadius` | `"md"` | Standardized rounded corner radius. |
| `padding` | `SpacingScale` | `"md"` | Inner padding constraint. |
| `bordered` | `boolean` | `false` | Outlines container with a subtle high-contrast border. |
| `frame` | `FrameVariant` | `"none"` | Frame decorative style class. |
| `effects` | `ComponentEffect \| ComponentEffect[]` | `[]` | Dynamic effects applied (e.g., hover glowing, shimmer). |
| `animate` | `AnimationType` | `"none"` | Entrance or looping micro-animation style. |
| `theme` | `ComponentTheme` | — | Sets a dynamic semantic color surface. |
| `caption` | `string` | — | Displays a separated caption banner at the bottom. |
| `class` | `string` | `""` | Custom container class. |
| `class:list` | `Record<string, boolean> \| any[]` | `{}` | Dynamic class properties object. |

#### Example 1: Common Usage (Standard Card Elevated Surface)
A standard elevated panel ideal for containing block articles or descriptive summaries.
```astro
<Paper 
  layer="1" 
  radius="md" 
  padding="md" 
  bordered={true} 
>
  <h3>Project Overview</h3>
  <p>Detailed architecture analysis of the codebase elements...</p>
</Paper>
```

#### Example 2: Advanced Usage (Animated Hover Glow Terminal Showcase)
An advanced layered surface configured with a subtle entrance animation, a dynamic glow effect, and a dark elevation theme complete with a footer caption banner.
```astro
<Paper 
  layer="3" 
  radius="lg" 
  padding="lg" 
  theme="default" 
  effects="glow" 
  animate="slide-up" 
  caption="Active System Diagnostics, v1.4.0" 
>
  <h4 class="text--accent">Runtime Console</h4>
  <p class="font-mono text-xs">system_status: online<br />latency: 18ms</p>
</Paper>
```

---

### Icon
`Icon.astro` is our foundational atomic media primitive used to fetch and render raw vector paths cleanly at runtime.
- **Path**: [`src/components/ui/primitives/Icon.astro`](file:///home/jk/Code/portfolio/src/components/ui/primitives/Icon.astro)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` (Required) | `string` | — | Name of the SVG file in the icons folder to import. |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| string` | `"md"` | Predefined dimensions (`"sm"`: 16px, `"md"`: 24px, `"lg"`: 32px, `"xl"`: 48px) or accepts custom CSS length values (e.g., `"10rem"`). |
| `stroke` | `string` | `"currentColor"` | Defines the stroke color of the SVG path. |
| `class` | `string` | `""` | Extensible custom class name. |
| `class:list` | `Record<string, boolean> \| any[]` | `{}` | Astro dynamic class list object or array. |

#### Example 1: Common Usage (Standard Button Chevron Indicator)
A standard inline chevron arrow commonly nested inside list nodes or button wrappers.
```astro
<Icon 
  name="chevron-down" 
  size="sm" 
  stroke="var(--text-muted)" 
/>
```

#### Example 2: Advanced Usage (Large Pulsing Accent Icon)
A large accent icon utilized as a decorative grid highlight featuring custom dimensions, stroke tokens, and a floating looping micro-animation wrapper.
```astro
<Icon 
  name="zap" 
  size="xl" 
  stroke="var(--accent)" 
  class="animate-pulse duration-1000" 
/>
```
