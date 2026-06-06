## components/ui/primitives

- ~~Button: Primary interactive trigger for actions~~
- ~~Link: Styled link with variant + size system~~

1. ~~`Text.astro` is the core readable text primitive.~~ 
      *Minimal*: `font-size`, `line-height`, `color`
      *Average*: `size`, `weight`, `tone`, `align`, `truncate`, `italicize`, `mono` props
      *Advanced*: polymorphic rendering, text-wrap balancing, fluid typography, responsive props, semantic tone system, contextual inheritance
2. ~~`Heading.astro` provides semantic heading and display system.~~ Didn't do it.
      *Minimal*: `<Heading level='2' />`
      *Average*: `level`, `size`, `weight`, `tracking`, `balance`, `eyebrow`
      *Advanced*: display mode, hero scaling, reveal animations, editorial presets, automatic anchor links, contextual spacing
3. ~~`Button.astro` is one of the most system-heavy primitives.~~
      *Minimal*: `<Button>Save</Button>`
      *Average*: `variant`, `size`, `icon`, `loading`, `disabled`, `active`, `href`, `"class:list"`
      *Advanced*: polymorphism, async states, shortcuts, `variant` system, icon system, loading system, disabled system, active system, href system, target system, rel system, as system, type system, class system, class:list system
4. ~~`Surface.astro` defines the elevation/background behavior.~~
      *Minimal*: `<Surface>`
      *Average*: `<Surface elevation="2" glass bordered />` — `elevation`, `tone`, `glass`, `interactive` props
      *Advanced*: glassmorphism, layered backgrounds, animated gradients, lighting, interaction states, `elevation` system, `tone` system, contextual inheritance, responsive props, polymorphism, animations, transitions, variants, sizes
5. ~~`Frame.astro` is the visual/media containment primitive.~~
      *Minimal*: `<Frame src="https://..." />`
      *Average*: `<Frame ratio="16/9" rounded="lg" />` — `shape`, `size`, `src`, `alt`, `"class:list"`
      *Advanced*: `<Frame ratio="16/9" cinematic masked hoverZoom />` — `shape` system, `size` system, responsive props, polymorphism, animations, transitions
6. ~~`Stack.astro` is the vertical spacing/layout primitive.~~
      *Minimal*: `<Stack>`
      *Average*: `<Stack gap="lg" align="center" />` — `gap`, `align`, `justify`, `wrap`
      *Advanced*: responsive spacing system, automatic dividers, contextual spacing inheritance, polymorphism, responsive props, nested layout intelligence
7.~~ `Grid.astro` is the responsive layout primitive.~~
      *Minimal*: `<Grid>`
      *Average*: `<Grid cols={3} gap="lg" />` — `cols`, `gap`, `rows`, `align`, `justify`
      *Advanced*: masonry layouts, bento layouts, auto-fit logic, subgrid support, responsive props, layout presets, contextual inheritance
8. ~~`Container.astro` constrains layout width and manages page spacing.~~
*Minimal*: `<Container>`
*Average*: `<Container size="prose" centered />` — `size`, `padding`, `centered`, `bleed`
*Advanced*: breakout layouts, cinematic widths, edge-to-edge bleed systems, responsive spacing logic, editorial presets, contextual inheritance
9. ~~`Input.astro` is the core text input primitive.~~
*Minimal*: `<Input />`
*Average*: `label`, `placeholder`, `error`, `hint`, `disabled`, `required`, `icon`
*Advanced*: floating labels, async validation, masking, autosizing, command-style inputs, accessibility systems, validation systems, icon systems, responsive props, polymorphism
10. `~~Modal.astro` is the layered overlay/dialog primitive.~~
    *Minimal*: `<Modal open={open}>`
    *Average*: `title`, `description`, `closeOnEscape`, `closeOnBackdrop`, `size`
    *Advanced*: portals, focus trapping, scroll locking, nested overlays, transitions, animation systems, accessibility systems, responsive layouts, polymorphism, contextual inheritance
11. ~~`Divider.astro` provides visual separation between sections or grouped content.~~
    *Minimal*: `<Divider />`
    *Average*: `orientation`, `label`, `spacing`, `tone`, `decorative`
    *Advanced*: gradient dividers, responsive spacing systems, animated separators, contextual inheritance, semantic grouping system*
1.  `Inline.astro` is the horizontal inline layout primitive.
*Minimal*: `<Inline>`
*Average*: `gap`, `align`, `justify`, `wrap`
*Advanced*: responsive inline systems, automatic wrapping behavior, contextual spacing inheritance, polymorphism, adaptive alignment systems
14. `Image.astro` is the optimized visual media primitive.
*Minimal*: `<Image src="..." alt="..." />`
*Average*: `src`, `alt`, `width`, `height`, `fit`, `position`, `loading`, `decoding`, `rounded`
*Advanced*: responsive image systems, lazy loading, blur placeholders, art direction, progressive loading, aspect-ratio systems, animations, overlays, polymorphism
15. `Skeleton.astro` provides loading-state placeholders matching final content layout.
*Minimal*: `<Skeleton />`
*Average*: `width`, `height`, `shape`, `rounded`, `animated`
*Advanced*: shimmer systems, contextual loading patterns, responsive skeleton layouts, grouped skeleton presets, animation systems
16. `Spinner.astro` provides loading and processing indicators.
*Minimal*: `<Spinner />`
*Average*: `size`, `speed`, `label`, `tone`
*Advanced*: motion systems, accessibility announcements, contextual loading states, progress-aware animations, variant systems
17. `Avatar.astro` visually represents users or entities.
*Minimal*: `<Avatar src="..." />`
*Average*: `src`, `alt`, `size`, `fallback`, `status`, `shape`
*Advanced*: stacked avatar groups, presence systems, status indicators, responsive sizing systems, fallback generation, polymorphism
1.  `List.astro` structures grouped collections of related items.
*Minimal*: `<List>`
*Average*: `gap`, `ordered`, `divider`, `marker`, `align`
*Advanced*: virtualized rendering, responsive layouts, nested collection systems, keyboard navigation systems, contextual inheritance, polymorphism
21. `Box.astro` is the universal low-level container primitive.
*Minimal*: `<Box>`
*Average*: `padding`, `margin`, `display`, `rounded`, `border`
*Advanced*: responsive layout props, token-driven spacing systems, polymorphism, contextual inheritance, utility abstraction systems
22. `Link.astro` is the navigational text and interaction primitive.
*Minimal*: `<Link href="/about">`
*Average*: `href`, `external`, `underline`, `tone`, `target`
*Advanced*: active route systems, transition systems, accessibility enhancements, contextual styling systems, polymorphism
23. `Icon.astro` renders scalable symbolic visuals.
*Minimal*: `<Icon name="search" />`
*Average*: `name`, `size`, `stroke`, `filled`, `decorative`
*Advanced*: dynamic icon loading, animation systems, accessibility systems, responsive sizing systems, contextual inheritance
24. `Badge.astro` displays compact status or category metadata.
*Minimal*: `<Badge>`
*Average*: `variant`, `tone`, `size`, `outlined`
*Advanced*: notification systems, animated states, contextual inheritance, token-driven variants, interaction systems
25. `Tooltip.astro` provides contextual hover/focus information overlays.
*Minimal*: `<Tooltip content="Info">`
*Average*: `content`, `placement`, `delay`, `interactive`
*Advanced*: positioning engines, collision detection, animation systems, accessibility systems, portal systems, responsive behavior
26. `Popover.astro` provides anchored floating interactive content.
*Minimal*: `<Popover>`
*Average*: `placement`, `trigger`, `offset`, `open`
*Advanced*: positioning systems, collision detection, nested overlays, focus management, portals, animation systems
27. `Tabs.astro` organizes content into switchable views.
*Minimal*: `<Tabs>`
*Average*: `defaultValue`, `orientation`, `size`, `variant`
*Advanced*: keyboard navigation, animated indicators, lazy rendering, responsive layouts, accessibility systems, contextual inheritance
28. `Toast.astro` displays temporary system notifications.
*Minimal*: `<Toast>`
*Average*: `title`, `description`, `variant`, `duration`
*Advanced*: queue systems, grouped notifications, animation systems, accessibility announcements, swipe gestures, portal systems
29. `CodeBlock.astro` displays formatted code snippets.
*Minimal*: `<CodeBlock code={code} />`
*Average*: `language`, `filename`, `highlight`, `lineNumbers`
*Advanced*: copy systems, syntax highlighting systems, diff rendering, live previews, collapsible sections, responsive layout
*Minimal*: `<CommandPalette />`

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1. Spacer         - provides controlled empty space between layouts or components.
                  -`size`, `axis`, `responsive`
                  - responsive spacing systems, token-driven spacing, contextual layout inheritance, adaptive spacing logic
2. Slider         - Draggable numeric range input
3. RangeSlider    - Dual-handle slider for selecting a value range
4. Multiselect    -
5. IconButton     - Compact button represented by an icon only
6. ToggleButton   - Binary state button switching on/off
7. Tag            - Label used for categorization or filtering
8. Chip           - Interactive compact tag or filter element
9. Quote          -
10. Label         - Descriptive text for form inputs
11. PullToRefresh - Gesture-based content refresh control
12. Thumbnail     - Small preview image representation
13. Gallery       - Collection of images displayed together
14. Header        - Page-level top section containing branding and actions
15. Footer        - Bottom section for secondary links and metadata
16. StatCard      - Card displaying a single key metric
17. SearchIndexer - Builds searchable content index
18. AudioPlayer   - Embedded audio playback component
19. MiniPlayer    - Compact persistent media control
20. Waveform      - Visual representation of audio signal
21. 


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



1.  `AnimateOnScroll.astro` reveals or animates content during viewport entry.
      *Average*: `animation`, `delay`, `duration`, `threshold`, `once`
      *Advanced*: stagger systems, scroll-linked motion, intersection observer systems, sequencing systems, responsive motion control, reduced-motion accessibility systems
2.  `Item.astro` is a generic composable item primitive for lists, menus, or collections. Serves as a container for item content. 
                 It provides a flexible layout with support for different visual variants and sizes.
      *Average*: `active`, `disabled`, `selected`, `interactive`, `href`
      *Advanced*: selection systems, keyboard navigation, contextual inheritance, accessibility systems, polymorphism, interaction systems
3.  `CommandPalette.astro` provides keyboard-driven navigation and actions.
      *Average*: `open`, `placeholder`, `groups`, `shortcuts`
      *Advanced*: fuzzy searching, keyboard navigation systems, grouped actions, async search systems, accessibility systems, command history

--------------------------------------------------------------------------------------------
- Event: Single event entry within a timeline or calendar
- Timeline: Chronological sequence of events
- Calendar: Date grid for scheduling or selection

- CommandInput: Input field tied to command palette actions
- OTPInput: Multi-field input for one-time passwords
- FileUpload: Interface for selecting and uploading files
- ColorPicker: Visual selector for colors
- DatePicker: Calendar-based date selection input
- TimePicker: Control for selecting time values
- FormField: Wrapper combining label, input, and validation
- Fieldset: Grouped form controls with shared context







How they fit the existing layout primitives



New component
Base primitive(s) used



KeyValueList / DescriptionList
Box (spacing) + native <dl>


Sparkline
Box (size) + inline SVG


Callout
Paper‑style container (via variant & padding)


TechStackList
Inline (gap) + Icon


TreeView
Box + native <details>


DatePicker
Box + Input‑style class list


Event
Box + Paper‑like dot


Timeline
Stack (vertical) + Event


HelperText
Pure text with spacing utilities
--------------------------------------------------------------------------------------------
----------------------------------------------------------
- Textarea: Multi-line text input field
- Tag: placed on something to show something about it.

- Caption?
----------------------------------------------------------
IMAGES / media
Figure: Image with caption and semantic groupin
AspectRatio: Maintains fixed aspect ratios
Carousel: Horizontally scrollable media viewer
Lightbox: Full-screen media preview overlay
VideoPlayer: Embedded video playback component

------------------------------------------------------------------------------------------
 Animations
An animated code input form
'pinned list'
scroll progress
"slot" animator
spring
sliding tabs
animated tooltip
https://animate-ui.com/docs/primitives/radix/files
https://animate-ui.com/docs/primitives/animate/motion-grid
--------------------------------------------------------------------------------------------
## Progress / State indicators
ProgressBar: Linear indicator of task completion
ProgressRing: Circular progress indicator
Snackbar: Bottom-anchored transient feedback message
Banner: Prominent horizontal message bar for announcements
EmptyState: UI shown when no data is available
ErrorState: UI representing a failure condition
SuccessState: UI confirming successful action
LoadingOverlay: Full-surface loading indicator layer
StatusBadge: Small label indicating system or item state
 Notification
NotificationCenter: Aggregated list of system notifications
ActivityFeed: Chronological list of system or user events
--------------------------------------------------------
 Macro Page-level stuff
AppShell: Root layout wrapper that defines global structure and spacing
PageContainer: Constrains page width and centers content
Section: Vertical content grouping with consistent spacing
SidebarLayout: Two-column layout with persistent navigation
MasonryGrid: Staggered grid for variable-height items
Drawer: Overlay panel typically for navigation or actions
Cluster: Wrapping horizontal group layer / 'Horizontal layout utility for wrapping inline items'
SplitPane: Resizable two-panel layout
--------------------------------------------------------
 Mobile stuff
BottomSheet: Draggable panel from bottom of scree
SwipeActions: Swipe-triggered item actions
MobileTabBar: Bottom tab navigation for mobile UI
FloatingComposeButton: Primary action button for mobile
GestureHandle: Draggable handle for interactive panel
--------------------------------------------------------

## Navigation Components

Sidebar: Persistent vertical navigation panel
Dock: Compact persistent action bar for primary routes
Pagination: Controls for navigating paged content
SegmentedControl: Toggle-style segmented option selector
Stepper: Guided multi-step process indicator
ContextMenu: Right-click or long-press action menu

DropdownMenu: Expandable menu anchored to a trigger
MegaMenu: Large multi-column navigation dropdown
MobileBottomNav: Bottom-fixed navigation for mobile layouts
FloatingActionButton: Prominent circular primary action button
TableOfContents: In-page navigation for long content
--------------------------------------------------------
----------------------------------------------------------
## Data

MetricCard: Structured display of quantitative data
DataTable: Structured tabular data presentation
DescriptionList: Key-value structured information layout
TreeView: Hierarchical expandable data structure
KeyValueList: Simple structured key-value display
Heatmap: Intensity-based data visualization grid
Chart: Graphical data visualization component
Sparkline: Minimal inline trend visualization
--------------------------------------------------------
 Content Components
FeatureGrid: Structured layout of product or feature highlights
Testimonial: User or customer feedback display block
PricingTable: Structured pricing plan comparison layout
FAQ: Expandable list of frequently asked questions
Callout: Highlighted informational or warning block
QuoteBlock: Styled block for emphasized quoted text
MediaBlock: Embedded media container (image/video/audio)
ArticleCard: Preview card for long-form content
BlogCard: Compact blog post preview component
AuthorCard: Profile summary of a content author
ChangelogEntry: Record of product or system updates
NewsletterSignup: Subscription form for email updates
--------------------------------------------------------
RichTextEditor: Full-featured WYSIWYG text editing interface
MarkdownEditor: Markdown-based text editing interface
InlineToolbar: Contextual formatting toolbar within editor
FloatingToolbar: Floating formatting controls near selection
SlashMenu: Command menu triggered by slash input
MentionPicker: User/entity autocomplete selection dropdown
PropertiesPanel: Editable attributes panel for selected item
InspectorPanel: Detailed configuration and metadata panel
ResizablePanel: Layout panel with adjustable dimensions
ActivitySidebar: Side panel showing recent activity feed
CommentThread: Threaded discussion tied to content
PresenceIndicators: Realtime user activity/cursor display
VersionHistory: Historical revision tracking interface
--------------------------------------------------------
 Authentication Components
LoginForm: User sign-in form interface
SignupForm: New account registration form
PasswordInput: Secure text input for passwords
SocialAuthButtons: Third-party authentication options
MFAInput: Multi-factor authentication input interface
SessionList: Active login sessions management view
ProfileMenu: User account dropdown menu
AccountSwitcher: Interface for switching between accounts
--------------------------------------------------------
 Ecommerce Components
ProductCard: Preview card for a product listing
ProductGallery: Visual showcase of product images
CartDrawer: Slide-in shopping cart panel
CheckoutStepper: Multi-step checkout process indicator
PriceBadge: Visual label for price or discount
QuantitySelector: Control for adjusting item quantity
ReviewCard: User review display block
VariantPicker: Selector for product variants
--------------------------------------------------------
 AI / Modern SaaS Components
AIChatPanel: Conversational AI interaction interface
PromptInput: Input field for AI prompt submission
MessageBubble: Individual chat message display
ConversationList: List of past or active conversations
AIResponseCard: Structured AI-generated response block
CitationBlock: References or sources supporting AI output
StreamingText: Progressively rendered text output
SuggestedPrompts: Recommended input suggestions for users
AICommandMenu: Command palette for AI actions
TokenUsageDisplay: Visualization of model token consumption
ModelPicker: Selector for AI model variants
----------------------------------------------------------

## System / Infrastructure Components
- ThemeProvider: Manages global theme and design tokens
- MotionProvider: Controls animation and transition system
- ToastProvider: Manages global toast notifications
- Portal: Renders UI outside DOM hierarchy
- FocusTrap: Restricts keyboard focus within a region
- ScrollArea: Custom scroll container with enhanced behavior
- KeyboardShortcuts: Global hotkey mapping system
- PresenceLayer: Handles realtime user presence state
- LiveRegion: Accessibility region for dynamic updates
- RouteTransition: Handles page transition animations
- ViewTransitionWrapper: Wrapper for browser view transitions

----------------------------------------------------------

## Portfolio-Specific Components
- ProjectCard: Summary card showcasing a single project
- CaseStudyHero: Large intro section for project detail page
- TechStackList: Visual list of technologies used in a project
- ProjectGallery: Visual media showcase for project work
- ArchitectureDiagram: Diagram of system or app structure
- WritingPreviewCard: Preview card for blog or article content
- MusicEmbed: Embedded audio or music-related content
- ExperimentCard: Card for side projects or prototypes
- NowSection: Live status section showing current focus
- TimelineResume: Chronological professional history display
- PhilosophySection: Narrative section describing design thinking
- ToolkitGrid: Visual grid of tools and technologies used
- FeaturedWriting: Highlighted writing or long-form content
- AvailabilityBadge: Indicator of availability for work/contact
- CommandPalette: Global shortcut-driven navigation and actions
- DockNavigation: Persistent dock-style navigation component

----------------------------------------------------------

Given your established aesthetic — dark editorial, amber gold, IBM Plex Mono, Playfair Display — I'll build these as a cohesive component library that slots right into Writty/Her Majesty's Displeasure's design system. Let me think through each one then build the showcase.Good context. I'll build all 10 as a single Astro component library file — pure vanilla TypeScript + CSS, no frameworks, designed to match your dark editorial system.

Let me think through the architecture first:

- **Spacer** — CSS custom property driven, token-mapped, axis-aware, responsive via container queries
- **Slider** — native `<input type="range">` with custom CSS track/thumb, value readout, accessible labelling
- **RangeSlider** — dual-handle using two overlapping range inputs, clip-path trick for filled track segment
- **Multiselect** — custom dropdown with keyboard nav, chip display of selected values, `<select multiple>` fallback
- **IconButton** — `<button>` variant, icon-only with mandatory `aria-label`, size/variant props
- **ToggleButton** — binary state button, `aria-pressed`, controlled or uncontrolled
- **Tag** — non-interactive label, semantic color variants, optional dot/icon prefix
- **Chip** — interactive Tag variant, dismissible, selectable state, `role="option"`
- **Quote** — blockquote with attribution, pull-quote and inline variants
- **Label** — form label with optional required marker, helper text, error stateEach section is expandable. Now here's how to implement all 10 as proper Astro components: