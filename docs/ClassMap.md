# Design System — Class Map

## Build Time
- **RemarkPlugins** → transforms → ContentCollections
- **DesignIconIndex** → indexes → SVGIcons
- **ContentCollections** → queried by → DesignQueries

---

## Layer 1 — Raw Values
`styles/tokens/`
- **ColorValues** `colors.css` — hex, rgb
- **TypographyValues** `typography.css` — sizes, weights, families
- **SpacingValues** `spacing.css` — 3xs → 3xl scale
- **MotionValues** `motion.css` — keyframes, durations, easings
- **LayoutValues** `layout.css` — breakpoints, grid units
- **SizeValues** `sizes.css` — fixed size scale

---

## Layer 2 — Tokens
`styles/tokens.css` — semantic CSS custom properties
- **ColorTokens** `--color-text-primary`, `--color-accent`, `--color-bg-surface`
- **TypographyTokens** `--font-size-1..10`, `--font-family-*`, `--line-height-*`
- **SpacingTokens** `--space-3xs..3xl`
- **MotionTokens** `--duration-*`, `--easing-*`

Each token maps to → a raw value

---

## Layer 3 — Recipes
`styles/variants/`
- **ThemeRecipes** `themes.css` — `control-theme--{variant}` bundles bg, color, border
- **ColormapRecipes** `colormaps.css` — named color bundles
- **AnimationRecipes** `animations.css` — `animate--{variant}` bundles keyframe, duration, easing
- **EffectRecipes** `effects.css` — shadow, blur bundles
- **FrameRecipes** `frames.css` — aspect ratio bundles
- **ShapeRecipes** `shapes.css` — border-radius bundles
- **LayerRecipes** `layers.css` — z-index scale
- **SpacingRecipes** `variants/spacing.css` — padding, gap bundles
- **TypographyRecipes** `variants/typography.css` — heading, body style bundles

Each recipe bundles → tokens

---

## Layer 4 — Enums
`types/variants.types.ts`
- **ControlThemeVariant** `primary | secondary | accent | ghost`
- **ToneVariant** `primary | secondary | accent | muted | inherit`
- **AnimationVariant** `slideUp | fadeIn | fadeOut | ...`
- **SpaceScale** `3xs | 2xs | xs | sm | md | lg | xl | 2xl | 3xl`
- **FontScale** `1..10`

Each enum maps to → a recipe or token

---

## Layer 5 — State
`design/state/`
- **Store** `interface` — `get()`, `set()`, `update()`, `subscribe()`
- **DerivedStore** `interface` — `get()`, `subscribe()` (read-only)
- **preferences.ts** — centralized user preference state with system sync

Concrete stores:
- **theme** `createPersistedStore<'light'|'dark'>` → sets `data-theme` on `<html>` → drives ColorTokens
- **reducedMotion** `createStore<boolean>` → syncs with `window.matchMedia` → conditionally suppresses AnimationRecipes
- **isDark** `createDerived(theme)` → `boolean`
- **sandbox** `createPersistedStore<SandboxState>` → drives accentHue, borderRadius, fontScale CSS vars
  - **accentHue** `createDerived(sandbox)` → `number`
  - **borderRadius** `createDerived(sandbox)` → `number`
  - **fontScale** `createDerived(sandbox)` → drives TypographyTokens
- **toasts** `createStore<Toast[]>` → drives ToastProvider
- **sidebarOpen** `createStore<boolean>` → drives Sidebar island

---

## Layer 6 — Assets
- **SVGIcons** `design/icons/` + `src/assets/icons/` → indexed by DesignIconIndex
- **StaticImages** `src/assets/` — og-image, media assets

---

## Layer 7 — Components
`src/components/ui/`

### Primitives `ui/primitives/`
Frame, Icon, Image, Link, Paper, Svg
- consume → ColorTokens, SpacingTokens, FrameRecipes, ShapeRecipes, SVGIcons

### Layout `ui/layout/`
Stack, Box, Grid, Columns, Center, Container, Inline, Bento, Spacer, Divider
- consume → SpacingTokens, SpacingRecipes, LayoutValues

### Typography `ui/typography/`
Text, Code, List, Prose, Quote, SectionLabel, MdHeading, Callout
- consume → TypographyTokens, TypographyRecipes, ColorTokens, AnimationRecipes
- typed by → ToneVariant, FontScale, AnimationVariant

### Action Controls `ui/controls/`
Button, ButtonGroup, IconButton, TabButton, Tabs, ToggleButton
- consume → ThemeRecipes, AnimationRecipes
- typed by → ControlThemeVariant, AnimationVariant
- compose → Primitives

### Input Controls `ui/input/`
Input, Select, Search, Checkbox, Radio, Switch, Slider, DatePicker, ComboBox, Multiselect, Label, HelperText
- consume → ColorTokens, SpacingTokens
- typed by → ControlThemeVariant
- compose → Primitives

### Feedback `ui/feedback/`
Alert, Avatar, Badge, BadgeGroup, Chip, Tag, Skeleton, SkeletonGroup, Spinner, ToastProvider
- consume → ThemeRecipes, ColormapRecipes, AnimationRecipes
- typed by → ToneVariant, ControlThemeVariant
- triggered by → toasts store
- compose → Primitives

### Overlays `ui/overlay/` + `ui/modal/` + `ui/alert-dialog/`
Modal, Sheet, Popover, Tooltip, AlertDialog
- consume → LayerRecipes, EffectRecipes, AnimationRecipes
- compose → Primitives

### Navigation `ui/navigation/`
Breadcrumbs, BreadcrumbItem
- compose → Primitives

### Data Display `ui/data/` + `ui/card/`
Table, Timeline, Sparkline, Event, DescriptionList, KeyValueList, Card
- Card built on → Paper
- consume → ColorTokens, SpacingTokens, EffectRecipes
- compose → Primitives

### Content `ui/content/`
Accordion, TreeView, TechStackList, Prose
- compose → Primitives, Typography

### Animation `ui/animation/`
Transition, Reveal, StaggerGroup
- Transition → dynamic view-transition-name generation, entering/exiting animations
- Reveal → IntersectionObserver-based scroll-triggered animations
- StaggerGroup → list choreography with incremental --stagger-delay CSS variables
- consume → MotionTokens, AnimationRecipes

---

## Layer 8 — Domain Components
`src/components/portfolio/` + `src/components/project/`
- Hero, NavBar, ProjectCard, ProjectBento, ProjectPageHero
- compose → Primitives, Layout, Typography, Cards, Feedback
- subscribe → theme, sidebarOpen stores

---

## Layer 9 — Utilities
`src/lib/`
- **toast.ts** — global trigger API, writes to → toasts store
- **DesignQueries** `lib/queries/` — queries ContentCollections for design pages

---

## Layer 10 — Pages & Layouts
`src/layouts/` + `src/pages/`
- Layouts compose → Domain components, Navigation, Overlays
- Pages consume → Layouts, DesignQueries, ContentCollections

classDiagram
  namespace BuildTime {
    class RemarkPlugins {
      <<plugins>>
      remark-preview.mjs
      remark-props.mjs
    }
    class ContentCollections {
      <<content>>
      blog, design
      glossary, projects
    }
    class DesignIconIndex {
      <<design/icons/index.ts>>
      generates icon map
    }
  }

  namespace RawValues {
    class ColorValues {
      <<colors.css>>
      hex, rgb
    }
    class TypographyValues {
      <<typography.css>>
      sizes, weights
    }
    class SpacingValues {
      <<spacing.css>>
      3xs to 3xl
    }
    class MotionValues {
      <<motion.css>>
      keyframes, durations
    }
    class LayoutValues {
      <<layout.css>>
      breakpoints, grid units
    }
    class SizeValues {
      <<sizes.css>>
      fixed size scale
    }
  }

  namespace Tokens {
    class ColorTokens {
      <<semantic CSS vars>>
      --color-text-primary
      --color-accent
      --color-bg-surface
    }
    class TypographyTokens {
      <<semantic CSS vars>>
      --font-size-1..10
      --font-family-*
    }
    class SpacingTokens {
      <<semantic CSS vars>>
      --space-3xs..3xl
    }
    class MotionTokens {
      <<semantic CSS vars>>
      --duration-*
      --easing-*
    }
  }

  namespace Enums {
    class VariantTypes {
      <<variants.types.ts>>
      ControlThemeVariant
      ToneVariant
      AnimationVariant
      SpaceScale
      FontScale
    }
  }

  namespace Recipes {
    class ThemeRecipes {
      <<themes.css>>
      control-theme--primary
      control-theme--secondary
    }
    class AnimationRecipes {
      <<animations.css>>
      animate--slideUp
      animate--fadeIn
    }
    class ColormapRecipes {
      <<colormaps.css>>
      named color bundles
    }
    class EffectRecipes {
      <<effects.css>>
      shadow, blur bundles
    }
    class FrameRecipes {
      <<frames.css>>
      aspect ratio bundles
    }
    class ShapeRecipes {
      <<shapes.css>>
      border-radius bundles
    }
    class LayerRecipes {
      <<layers.css>>
      z-index scale
    }
    class SpacingRecipes {
      <<variants/spacing.css>>
      padding, gap bundles
    }
    class TypographyRecipes {
      <<variants/typography.css>>
      heading, body bundles
    }
  }

  namespace Assets {
    class SVGIcons {
      <<design/icons>>
      per-component icons
      system icons
    }
    class StaticImages {
      <<src/assets>>
      og-image, media
    }
  }

  namespace State {
    class Store {
      <<interface>>
      +get() T
      +set(value T) void
      +update(fn) void
      +subscribe(fn) unsubscribe
    }
    class DerivedStore {
      <<interface>>
      +get() T
      +subscribe(fn) unsubscribe
    }
    class theme {
      <<createPersistedStore>>
      type: light | dark
    }
    class isDark {
      <<createDerived>>
      type: boolean
    }
    class sandbox {
      <<createPersistedStore>>
      accentHue: number
      borderRadius: number
      fontScale: sm|md|lg|xl
      reducedMotion: boolean
    }
    class accentHue {
      <<createDerived>>
      type: number
    }
    class borderRadius {
      <<createDerived>>
      type: number
    }
    class fontScale {
      <<createDerived>>
      type: sm|md|lg|xl
    }
    class reducedMotion {
      <<createDerived>>
      type: boolean
    }
    class toasts {
      <<createStore>>
      type: Toast[]
    }
    class sidebarOpen {
      <<createStore>>
      type: boolean
    }
  }

  namespace Utilities {
    class ToastLib {
      <<lib/toast.ts>>
      +notify(options) void
      +dismiss(id) void
    }
    class DesignQueries {
      <<lib/queries>>
      designCategories.ts
      designGrouping.ts
      designQueries.ts
    }
  }

  namespace Primitives {
    class AtomicPrimitives {
      <<ui/primitives>>
      Frame, Icon, Image
      Link, Paper, Svg
    }
    class LayoutPrimitives {
      <<ui/layout>>
      Stack, Box, Grid
      Columns, Center
      Container, Inline
      Bento, Spacer
    }
    class TypographyPrimitives {
      <<ui/typography>>
      Text, Code, List
      Prose, Quote
      SectionLabel, Callout
    }
  }

  namespace Controls {
    class ActionControls {
      <<ui/controls>>
      Button, ButtonGroup
      IconButton, Tabs
      ToggleButton
    }
    class InputControls {
      <<ui/input>>
      Input, Select, Search
      Checkbox, Radio
      Switch, Slider
      DatePicker, ComboBox
    }
  }

  namespace Feedback {
    class FeedbackComponents {
      <<ui/feedback>>
      Alert, Avatar, Badge
      Chip, Tag, Skeleton
      Spinner, ToastProvider
    }
  }

  namespace Overlays {
    class OverlayComponents {
      <<ui/overlay + ui/modal>>
      Modal, Sheet
      Popover, Tooltip
      AlertDialog
    }
  }

  namespace DataDisplay {
    class DataComponents {
      <<ui/data>>
      Table, Timeline
      Sparkline, Event
      DescriptionList
    }
    class CardComponents {
      <<ui/card>>
      Card, CardHeader
      CardContent, CardFooter
    }
  }

  namespace DomainComponents {
    class PortfolioComponents {
      <<components/portfolio>>
      Hero, NavBar
      ProjectCard, ProjectBento
    }
    class ContentComponents {
      <<components/content>>
      Accordion, TreeView
      TechStackList
    }
  }

  namespace Pages {
    class Layouts {
      <<layouts>>
      Layout, BlogPost
      GlossaryPost, ProjectLayout
    }
    class PageRoutes {
      <<pages>>
      index, blog, design
      glossary, projects
    }
  }

  ColorValues <-- ColorTokens : maps to
  TypographyValues <-- TypographyTokens : maps to
  SpacingValues <-- SpacingTokens : maps to
  MotionValues <-- MotionTokens : maps to

  ColorTokens <-- ThemeRecipes : bundles
  ColorTokens <-- ColormapRecipes : bundles
  MotionTokens <-- AnimationRecipes : bundles
  SpacingTokens <-- SpacingRecipes : bundles
  TypographyTokens <-- TypographyRecipes : bundles

  VariantTypes <-- ThemeRecipes : maps to
  VariantTypes <-- AnimationRecipes : maps to
  VariantTypes <-- ColormapRecipes : maps to

  Store <|-- DerivedStore
  Store <|-- theme
  Store <|-- sandbox
  Store <|-- toasts
  Store <|-- sidebarOpen
  DerivedStore <|-- isDark
  DerivedStore <|-- accentHue
  DerivedStore <|-- borderRadius
  DerivedStore <|-- fontScale
  DerivedStore <|-- reducedMotion

  isDark --> theme : derived from
  accentHue --> sandbox : derived from
  borderRadius --> sandbox : derived from
  fontScale --> sandbox : derived from
  reducedMotion --> sandbox : derived from

  theme --> ColorTokens : overrides via data-theme
  fontScale --> TypographyTokens : overrides via CSS var
  accentHue --> ColorTokens : overrides via CSS var
  borderRadius --> ShapeRecipes : overrides via CSS var

  ToastLib --> toasts : writes to
  FeedbackComponents --> toasts : subscribes

  DesignIconIndex --> SVGIcons : indexes
  RemarkPlugins --> ContentCollections : transforms
  ContentCollections --> DesignQueries : queried by

  AtomicPrimitives --> SVGIcons : uses
  AtomicPrimitives --> ColorTokens : consumes
  AtomicPrimitives --> SpacingTokens : consumes
  AtomicPrimitives --> FrameRecipes : consumes
  AtomicPrimitives --> ShapeRecipes : consumes

  LayoutPrimitives --> SpacingTokens : consumes
  LayoutPrimitives --> SpacingRecipes : consumes
  LayoutPrimitives --> LayoutValues : consumes

  TypographyPrimitives --> TypographyTokens : consumes
  TypographyPrimitives --> TypographyRecipes : consumes
  TypographyPrimitives --> ColorTokens : consumes
  TypographyPrimitives --> AnimationRecipes : consumes
  TypographyPrimitives --> VariantTypes : typed by

  ActionControls --> ThemeRecipes : consumes
  ActionControls --> AnimationRecipes : consumes
  ActionControls --> VariantTypes : typed by
  ActionControls --> AtomicPrimitives : uses

  InputControls --> ColorTokens : consumes
  InputControls --> SpacingTokens : consumes
  InputControls --> VariantTypes : typed by
  InputControls --> AtomicPrimitives : uses

  FeedbackComponents --> ThemeRecipes : consumes
  FeedbackComponents --> ColormapRecipes : consumes
  FeedbackComponents --> AnimationRecipes : consumes
  FeedbackComponents --> VariantTypes : typed by
  FeedbackComponents --> AtomicPrimitives : uses

  OverlayComponents --> LayerRecipes : consumes
  OverlayComponents --> EffectRecipes : consumes
  OverlayComponents --> AnimationRecipes : consumes
  OverlayComponents --> AtomicPrimitives : uses

  DataComponents --> ColorTokens : consumes
  DataComponents --> SpacingTokens : consumes
  DataComponents --> AtomicPrimitives : uses
  CardComponents --> SpacingRecipes : consumes
  CardComponents --> EffectRecipes : consumes
  CardComponents --> AtomicPrimitives : uses

  PortfolioComponents --> AtomicPrimitives : composes
  PortfolioComponents --> LayoutPrimitives : composes
  PortfolioComponents --> TypographyPrimitives : composes
  PortfolioComponents --> CardComponents : composes
  PortfolioComponents --> theme : subscribes
  PortfolioComponents --> sidebarOpen : subscribes

  ContentComponents --> AtomicPrimitives : composes
  ContentComponents --> TypographyPrimitives : composes

  Layouts --> PortfolioComponents : uses
  Layouts --> OverlayComponents : uses
  PageRoutes --> Layouts : uses
  PageRoutes --> DesignQueries : uses
  PageRoutes --> ContentCollections : uses