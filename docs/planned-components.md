## components/ui/primitives

- ~~Button: Primary interactive trigger for actions~~
- ~~Link: Styled link with variant + size system~~

1. `Text.astro` is the core readable text primitive. 

*Minimal*: `font-size`, `line-height`, `color`
*Average*: `size`, `weight`, `tone`, `align`, `truncate`, `italicize`, `mono` props
*Advanced*: polymorphic rendering, text-wrap balancing, fluid typography, responsive props, semantic tone system, contextual inheritance

2. `Heading.astro` provides semantic heading and display system.

*Minimal*: `<Heading level='2' />`
*Average*: `level`, `size`, `weight`, `tracking`, `balance`, `eyebrow`
*Advanced*: display mode, hero scaling, reveal animations, editorial presets, automatic anchor links, contextual spacing

3. `Button.astro` is one of the most system-heavy primitives.

*Minimal*: `<Button>Save</Button>`
*Average*: `variant`, `size`, `icon`, `loading`, `disabled`, `active`, `href`, `"class:list"`
*Advanced*: polymorphism, async states, shortcuts, `variant` system, icon system, loading system, disabled system, active system, href system, target system, rel system, as system, type system, class system, class:list system

4. `Surface.astro` defines the elevation/background behavior.

*Minimal*: `<Surface>`
*Average*: `<Surface elevation="2" glass bordered />` — `elevation`, `tone`, `glass`, `interactive` props
*Advanced*: glassmorphism, layered backgrounds, animated gradients, lighting, interaction states, `elevation` system, `tone` system, contextual inheritance, responsive props, polymorphism, animations, transitions, variants, sizes

5. `Frame.astro` is the visual/media containment primitive.

*Minimal*: `<Frame src="https://..." />`
*Average*: `<Frame ratio="16/9" rounded="lg" />` — `shape`, `size`, `src`, `alt`, `"class:list"`
*Advanced*: `<Frame ratio="16/9" cinematic masked hoverZoom />` — `shape` system, `size` system, responsive props, polymorphism, animations, transitions

6. `Stack.astro` is the vertical spacing/layout primitive.

*Minimal*: `<Stack>`
*Average*: `<Stack gap="lg" align="center" />` — `gap`, `align`, `justify`, `wrap`
*Advanced*: responsive spacing system, automatic dividers, contextual spacing inheritance, polymorphism, responsive props, nested layout intelligence

7. `Grid.astro` is the responsive layout primitive.

*Minimal*: `<Grid>`
*Average*: `<Grid cols={3} gap="lg" />` — `cols`, `gap`, `rows`, `align`, `justify`
*Advanced*: masonry layouts, bento layouts, auto-fit logic, subgrid support, responsive props, layout presets, contextual inheritance

8. `Container.astro` constrains layout width and manages page spacing.

*Minimal*: `<Container>`
*Average*: `<Container size="prose" centered />` — `size`, `padding`, `centered`, `bleed`
*Advanced*: breakout layouts, cinematic widths, edge-to-edge bleed systems, responsive spacing logic, editorial presets, contextual inheritance

9. `Input.astro` is the core text input primitive.

*Minimal*: `<Input />`
*Average*: `label`, `placeholder`, `error`, `hint`, `disabled`, `required`, `icon`
*Advanced*: floating labels, async validation, masking, autosizing, command-style inputs, accessibility systems, validation systems, icon systems, responsive props, polymorphism

10. `Modal.astro` is the layered overlay/dialog primitive.

*Minimal*: `<Modal open={open}>`
*Average*: `title`, `description`, `closeOnEscape`, `closeOnBackdrop`, `size`
*Advanced*: portals, focus trapping, scroll locking, nested overlays, transitions, animation systems, accessibility systems, responsive layouts, polymorphism, contextual inheritance

11. `Divider.astro` provides visual separation between sections or grouped content.

*Minimal*: `<Divider />`
*Average*: `orientation`, `label`, `spacing`, `tone`, `decorative`
*Advanced*: gradient dividers, responsive spacing systems, animated separators, contextual inheritance, semantic grouping systems

12. `Spacer.astro` provides controlled empty space between layouts or components.

*Minimal*: `<Spacer />`
*Average*: `size`, `axis`, `responsive`
*Advanced*: responsive spacing systems, token-driven spacing, contextual layout inheritance, adaptive spacing logic

13. `Inline.astro` is the horizontal inline layout primitive.

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

18. `AnimateOnScroll.astro` reveals or animates content during viewport entry.

*Minimal*: `<AnimateOnScroll>`
*Average*: `animation`, `delay`, `duration`, `threshold`, `once`
*Advanced*: stagger systems, scroll-linked motion, intersection observer systems, sequencing systems, responsive motion control, reduced-motion accessibility systems

19. `Item.astro` is a generic composable item primitive for lists, menus, or collections.

*Minimal*: `<Item>`
*Average*: `active`, `disabled`, `selected`, `interactive`, `href`
*Advanced*: selection systems, keyboard navigation, contextual inheritance, accessibility systems, polymorphism, interaction systems

20. `List.astro` structures grouped collections of related items.

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
*Advanced*: copy systems, syntax highlighting systems, diff rendering, live previews, collapsible sections, responsive layouts

30. `CommandPalette.astro` provides keyboard-driven navigation and actions.

*Minimal*: `<CommandPalette />`
*Average*: `open`, `placeholder`, `groups`, `shortcuts`
*Advanced*: fuzzy searching, keyboard navigation systems, grouped actions, async search systems, accessibility systems, command history
```







----------------------------------

9.  Stack
10. Grid
11. Container
12. Input
13. Modal

Spinner: Animated indicator for loading state
- Center: Horizontally/vertically centers children
- Text: the single typography primitive used to render all textual content (body, headings, captions, labels, etc)

- Icon
- Badge/Label - smaller unit that holds text and (see paper below)
- Tag: placed on something to show something about it.
- Tooltip: Small contextual hint shown on hover or focus
- Tag: Label used for categorization or filtering
- Chip: Interactive compact tag or filter element
- 
  Event: Single event entry within a timeline or calendar
- Timeline: Chronological sequence of events
- Calendar: Date grid for scheduling or selection

- Quote: 
- Code:
- Caption? Heading?

- Box: Generic container wrapper
- Container: Width-constrained page wrapper
- Stack: Vertical layout utility for evenly spaced children
- Cluster: Wrapping horizontal group layer / 'Horizontal layout utility for wrapping inline items'
- Paper: a surface-level layout primitive that provides a consistent visual background, elevation, and boundary for grouped content

- 
- Item - serves as a container for item content. It provides a flexible layout with support for different visual variants and sizes.
- Box: Generic container wrapper
- Container: Width-constrained page wrapper
- Stack: Vertical layout utility for evenly spaced children
- Cluster: Wrapping horizontal group layer / 'Horizontal layout utility for wrapping inline items'
- Panel: Secondary container for grouped related content
- Surface: Base background layer for elevated UI regions
- SplitPane: Resizable two-panel layout
- Sheet: Slide-in surface panel from screen edge
- AspectRatio: Maintains fixed aspect ratios


-




## Media Components
- Figure: Image with caption and semantic grouping
- Thumbnail: Small preview image representation
- Gallery: Collection of images displayed together


## components/ui/input
- Label: Descriptive text for form inputs
- IconButton: Compact button represented by an icon only
- ToggleButton: Binary state button switching on/off
- Input: Single-line text entry field
- Textarea: Multi-line text input field
- Select: Dropdown selection control
- Combobox: Searchable select input with filtering
- Checkbox: Boolean selection input
- RadioGroup: Mutually exclusive option selector group
- Switch: Toggle control for boolean settings
- Slider: Draggable numeric range input
- RangeSlider: Dual-handle slider for selecting a value range
- SearchInput: Text input optimized for search behavior
- CommandInput: Input field tied to command palette actions
- OTPInput: Multi-field input for one-time passwords
- FileUpload: Interface for selecting and uploading files
- ColorPicker: Visual selector for colors
- DatePicker: Calendar-based date selection input
- TimePicker: Control for selecting time values
- FormField: Wrapper combining label, input, and validation
- Fieldset: Grouped form controls with shared context
- HelperText: Secondary guidance text for inputs




## components/ui/layout

## Animations
- An animated code input form
- 'pinned list'
- scroll progress
- "slot" animator
- spring
- sliding tabs
- animated tooltip
https://animate-ui.com/docs/primitives/radix/files
https://animate-ui.com/docs/primitives/animate/motion-grid




- Section: Semantic page section wrapper
- Grid: Responsive grid system for structured layouts


- Card: Contained content block with border and elevation

- Checkbox
- Switch / Toggle / Slide switch
- Input
- Select
- Multiselect
- Combobox

-****









## components/ui/feedback

ProgressBar: Linear indicator of task completion
- ProgressRing: Circular progress indicator
- - Alert: Inline message indicating important system state
- Toast: Temporary notification that disappears automatically
- Snackbar: Bottom-anchored transient feedback message
- Banner: Prominent horizontal message bar for announcements
- EmptyState: UI shown when no data is available
- ErrorState: UI representing a failure condition
- SuccessState: UI confirming successful action
- LoadingOverlay: Full-surface loading indicator layer
- StatusBadge: Small label indicating system or item state



## Foundational Layout Components

- AppShell: Root layout wrapper that defines global structure and spacing
- PageContainer: Constrains page width and centers content
- Section: Vertical content grouping with consistent spacing

- SidebarLayout: Two-column layout with persistent navigation
- BentoGrid: Asymmetrical grid layout for featured content
- MasonryGrid: Staggered grid for variable-height items


- Drawer: Overlay panel typically for navigation or actions
- Modal: Centered overlay dialog blocking background interaction
- Popover: Anchored floating UI attached to a trigger element

## Navigation Components

- Navbar: Top-level navigation bar for primary site sections
- Header: Page-level top section containing branding and actions
- Footer: Bottom section for secondary links and metadata
- Sidebar: Persistent vertical navigation panel
- Dock: Compact persistent action bar for primary routes
- Breadcrumbs: Hierarchical navigation trail indicator
- Pagination: Controls for navigating paged content
- Tabs: Segmented navigation between related views
- SegmentedControl: Toggle-style segmented option selector
- Stepper: Guided multi-step process indicator
- CommandPalette: Keyboard-driven global action/search interface
- ContextMenu: Right-click or long-press action menu
- DropdownMenu: Expandable menu anchored to a trigger
- MegaMenu: Large multi-column navigation dropdown
- MobileBottomNav: Bottom-fixed navigation for mobile layouts
- FloatingActionButton: Prominent circular primary action button
- TableOfContents: In-page navigation for long content

## Input Components
## Feedback Components



- NotificationCenter: Aggregated list of system notifications


- ActivityFeed: Chronological list of system or user events






## Data Display Components

- Badge: Small label indicating category or status
- StatCard: Card displaying a single key metric
- MetricCard: Structured display of quantitative data
- DataTable: Structured tabular data presentation
- DescriptionList: Key-value structured information layout
- Accordion: Collapsible content sections
- TreeView: Hierarchical expandable data structure
- KeyValueList: Simple structured key-value display
- Heatmap: Intensity-based data visualization grid
- Chart: Graphical data visualization component
- Sparkline: Minimal inline trend visualization

## Content Components

- Hero: Prominent introductory section of a page
- FeatureGrid: Structured layout of product or feature highlights
- Testimonial: User or customer feedback display block
- PricingTable: Structured pricing plan comparison layout
- FAQ: Expandable list of frequently asked questions
- Callout: Highlighted informational or warning block
- QuoteBlock: Styled block for emphasized quoted text
- CodeBlock: Formatted display of code snippets
- MediaBlock: Embedded media container (image/video/audio)
- ArticleCard: Preview card for long-form content
- BlogCard: Compact blog post preview component
- AuthorCard: Profile summary of a content author
- ChangelogEntry: Record of product or system updates
- TimelineEvent: Single event entry within a timeline
- NewsletterSignup: Subscription form for email updates






- Carousel: Horizontally scrollable media viewer
- Lightbox: Full-screen media preview overlay
- VideoPlayer: Embedded video playback component
- AudioPlayer: Embedded audio playback component
- MiniPlayer: Compact persistent media control
- Waveform: Visual representation of audio signal

## Editor / Productivity Components

- RichTextEditor: Full-featured WYSIWYG text editing interface
- MarkdownEditor: Markdown-based text editing interface
- InlineToolbar: Contextual formatting toolbar within editor
- FloatingToolbar: Floating formatting controls near selection
- SlashMenu: Command menu triggered by slash input
- MentionPicker: User/entity autocomplete selection dropdown
- PropertiesPanel: Editable attributes panel for selected item
- InspectorPanel: Detailed configuration and metadata panel
- ResizablePanel: Layout panel with adjustable dimensions
- ActivitySidebar: Side panel showing recent activity feed
- CommentThread: Threaded discussion tied to content
- PresenceIndicators: Realtime user activity/cursor display
- VersionHistory: Historical revision tracking interface
- CommandBar: Global command input interface

## Authentication Components

- LoginForm: User sign-in form interface
- SignupForm: New account registration form
- PasswordInput: Secure text input for passwords
- SocialAuthButtons: Third-party authentication options
- MFAInput: Multi-factor authentication input interface
- SessionList: Active login sessions management view
- ProfileMenu: User account dropdown menu
- AccountSwitcher: Interface for switching between accounts

## Ecommerce Components

- ProductCard: Preview card for a product listing
- ProductGallery: Visual showcase of product images
- CartDrawer: Slide-in shopping cart panel
- CheckoutStepper: Multi-step checkout process indicator
- PriceBadge: Visual label for price or discount
- QuantitySelector: Control for adjusting item quantity
- ReviewCard: User review display block
- VariantPicker: Selector for product variants

## AI / Modern SaaS Components

- AIChatPanel: Conversational AI interaction interface
- PromptInput: Input field for AI prompt submission
- MessageBubble: Individual chat message display
- ConversationList: List of past or active conversations
- AIResponseCard: Structured AI-generated response block
- CitationBlock: References or sources supporting AI output
- StreamingText: Progressively rendered text output
- SuggestedPrompts: Recommended input suggestions for users
- AICommandMenu: Command palette for AI actions
- TokenUsageDisplay: Visualization of model token consumption
- ModelPicker: Selector for AI model variants

## Mobile-Oriented Components

- BottomSheet: Draggable panel from bottom of screen
- PullToRefresh: Gesture-based content refresh control
- SwipeActions: Swipe-triggered item actions
- MobileTabBar: Bottom tab navigation for mobile UI
- FloatingComposeButton: Primary action button for mobile
- GestureHandle: Draggable handle for interactive panels

## System / Infrastructure Components

- ThemeProvider: Manages global theme and design tokens
- MotionProvider: Controls animation and transition system
- ToastProvider: Manages global toast notifications
- Portal: Renders UI outside DOM hierarchy
- FocusTrap: Restricts keyboard focus within a region
- ScrollArea: Custom scroll container with enhanced behavior
- KeyboardShortcuts: Global hotkey mapping system
- SearchIndexer: Builds searchable content index
- PresenceLayer: Handles realtime user presence state
- LiveRegion: Accessibility region for dynamic updates
- RouteTransition: Handles page transition animations
- ViewTransitionWrapper: Wrapper for browser view transitions

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