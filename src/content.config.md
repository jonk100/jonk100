# Content Collections

This document describes how the content of this app is organised — what each collection is for, how collections relate to each other, and practical conventions for creating new content.

All collections are defined in `src/content/content.config.ts` using Astro's `defineCollection` and Zod schemas. Each collection maps to a folder inside `src/content/`. Every file in a collection folder is a `.mdx` file with a frontmatter block at the top and optional prose body below.


## The big picture

Collections fall into four tiers:

1. **Top-level containers** — the organisational wrappers your work lives inside (`projects`, `albums`, `sets`, `post-series`)
2. **Global shared entities** — things that exist independently of any one project and can be referenced from anywhere (`themes`, `chords`, `actors`)
3. **Project-scoped entities** — things that belong to one specific project (`characters`, `locations`, `plots`)
4. **Content hierarchy** — the actual written work, structured from largest to smallest unit (episodes → sequences → scenes → beats for screenplays; books → chapters → beats for books; albums → songs for music; standalone poems, short stories, posts, reviews)

Everything is linked by slug references. Slugs are derived from the file path inside each collection, so nested folders naturally define hierarchy.


## Slug conventions

Slugs are based on the file path relative to the collection folder. Nested directories are fully supported and are the standard way to organise content.

Example:

`src/content/characters/her-majestys-displeasure/nigel-finch.mdx`

Slug: `her-majestys-displeasure/nigel-finch`

### Recommended structure

| Collection     | Directory structure         | Example slug                           |
|----------------|-----------------------------|----------------------------------------|
| Characters     | `{project}/{character}`     | `some-project/nigel-finch`             |
| Locations      | `{project}/{location}`      | `some-project/twickenham-film-studios` |
| Plots          | `{project}/{plot}`          | `some-project/main-surveillance-plot`  |
| Episodes       | `{project}/ep{n}`           | `some-project/ep1`                     |
| Sequences      | `{project}/ep{n}/seq{n}`    | `some-project/ep1/seq2`                |
| Scenes         | `{project}/ep{n}/sc{n}`     | `some-project/ep1/sc4`                 |
| Chapters       | `{project}/ch{n}`           | `some-project/ch3`                     |
| Beats          | `{project}/{plot}/beat-{n}` | `some-project/main-plot/beat-12`       |
| Chords         | `{name}-{root-string}`      | `am7-0`, `am7-1`, `am7-2`             |
| Actors         | `{actor-name}`              | `elliott-gould`                        |

### Constraints

Slugs must match: `^[a-z0-9-/]+$`

- lowercase letters only
- numbers allowed
- hyphens allowed
- forward slashes allowed (for nesting)
- no spaces or underscores


---


## Top-level containers

### `projects`
The master container for screenplays and books. Every project has a `type` field that determines its structure: `screenplay-series` (has episodes), `standalone-film` (scenes belong directly to the project, no episodes), or `book` (has chapters). Characters, locations, plots, episodes, scenes, chapters, and beats all carry a `project` reference — this is how you scope queries to a single project.

#### Project Types
- `screenplay-series` — multi-episode TV series
- `standalone-film` — single film, scenes reference project directly
- `book` — prose work with chapters

### `albums`
A container for a group of songs. Songs can belong to an album or be standalone — the `album` field on a song is optional. Albums can carry their own key and tempo if the whole record shares a tonal centre.

#### Album Fields
- `title` — Album title
- `year` — Release year (optional)
- `keyRoot` — Tonal center root note (optional)
- `keyMode` — "major" or "minor" (optional)
- `themes` — Array of theme references
- `status` — "demo", "recording", "mixing", "mastered", "released"

### `sets`
A container for grouping poems or short stories — like a chapbook or an anthology. A set has a `contentType` field (`poems` or `short-stories`) to keep it homogeneous. Poems and short stories optionally reference a set via their `set` field.

#### Set Fields
- `title` — Set title
- `contentType` — "poems" or "short-stories"
- `themes` — Array of theme references
- `status` — "draft", "complete", "published"

### `post-series`
A named grouping of blog posts. Each series has a `sortBy` field — `date` for chronological series like reviews, `position` for manually ordered series like course modules. Posts reference a post-series via their `postSeries` field.

#### Post-Series Fields
- `title` — Series title
- `description` — Series description (optional)
- `sortBy` — "date" (chronological) or "position" (manual ordering)


---


## Global shared entities

These collections exist independently of any project and can be referenced from anywhere.

### `themes`
Cross-cutting thematic ideas that can be tagged onto almost anything — projects, albums, songs, scenes, posts, poems, etc. Examples: "paranoia", "loss", "bureaucracy", "identity".

### `chords`
A reference library of guitar chord voicings. Each record represents one specific voicing of a chord — so Am7 has separate records for each voicing shape.

#### `chords` Slugs

A number suffix in the slug encodes the root string position — a meaningful guitar theory property:

- `0` — open voicing (no barre, open strings)
- `1` — root on string 1, the low E string (E-shape barre)
- `2` — root on string 2, the A string (A-shape barre)
- `3` — root on string 3, the D string (D-shape barre), if needed

Any other suffix might describe a variation/shape that isn't a standard CAGED shape:

- `allman` - indicates the shape I learned as the allman chord, where we move the open C chord up the fretboard.

#### `songs` and `chords`

Songs reference chords in two parallel ways:

- `chordVoicings` — an array of specific voicing slugs (e.g. `am7-1`). Drives the hover chord diagram feature — tells the app which exact fingering to show.
- `sections[].chords` — an array of plain display name strings (e.g. `"Am7"`). This is what renders the chord sheet. Display names are not slugs — just the chord name as you'd write it on paper.

This separation means the chord sheet renders cleanly with just names, while the hover diagrams show the specific voicing you actually use.

#### Example — `src/content/chords/am7-1.mdx`

```yaml
---
displayName: Am7
voicingLabel: E-shape barre, 5th fret
baseFret: 5
fingering: [1, 3, 3, 2, 1, 1]
frets: [5, 7, 7, 6, 5, 5]
barre:
  finger: 1
  fret: 5
  strings: [1, 6]
notes: [A, E, A, C, E, A]
---
```

#### `chord` Fields:

- `fingering` — which finger (1–4) presses each string, low E to high E. `0` = open, `-1` = muted (x).
- `frets` — actual fret number each finger is on, low E to high E. `0` = open, `-1` = muted.
- `baseFret` — which fret the diagram starts on. Open chords are `1`. Barre chords use the root fret.
- `barre` — the barre: which finger, which fret, which strings it covers (`[1, 6]` = full barre across all six strings).
- `notes` — note names sounding on each string, useful for theory display.
- `enharmonic` — optional enharmonic equivalent (e.g., "A#" for "Bb", "G#" for "Ab").
- `displayName` — the chord name shown on chord sheets (e.g., "Am7")
- `voicingLabel` — descriptive label for the fingering reference UI (e.g., "E-shape barre, 5th fret")

### `actors`
People who appear in reviewed films and TV series. Actor files are created automatically by `enrich-actors.ts` and should generally not be edited by hand until enrichment is complete.

Each actor file is identified by a name-based slug (e.g. `elliott-gould`) and stores the actor's TMDB ID, date of birth, place of birth, and a locally downloaded profile image. Reviews reference actors via their `cast` field — an array of actor slugs.

The `heroImage` field uses Astro's `image()` helper, so it will be optimised at build time.

#### Example — `src/content/actors/elliott-gould.mdx`

```yaml
---
name: Elliott Gould
tmdbId: 6972
born: "1938-08-29"
from: "Brooklyn, New York City, New York, USA"
heroImage: /images/tmdb/elliott-gould-6972.jpg
---
```


---


## Project-scoped entities

These belong to one specific project and carry a `project` reference field.

### `characters`
Characters scoped to a project. Referenced by scenes and chapters via their `characters` array — this is how you query "all scenes featuring this character".

#### Character Fields
- `name` — Character name
- `project` — Project reference
- `role` — Brief role description
- `arc` — Character arc summary
- `themes` — Array of theme references
- `dialogue_name` — Name(s) used in dialogue generation (can be array for aliases)
- `character_type` — "historical_figure", "fictional", or "composite"
- `age` — Object with `act_1`, `act_2`, `act_3` age fields (optional)
- `occupation` — Character's occupation
- `description` — Physical/personal description
- `first_appearance` — Scene reference where character first appears (optional)
- `last_appearance` — Scene reference where character last appears (optional)
- `created` — Creation date (optional)
- `updated` — Last updated date (optional)

### `locations`
Physical locations scoped to a project. Each location has an `intOrExt` field (`INT`, `EXT`, or `INT/EXT`) used when composing scene headings. Scenes reference a single `location`.

#### Location Fields
- `name` — Location name
- `project` — Project reference
- `intOrExt` — "INT", "EXT", or "INT/EXT" for scene heading composition
- `realWorldRef` — Real-world location this is based on (optional)
- `type` — "interior", "exterior", or "misc"
- `description` — Location description
- `mood` — Atmospheric notes
- `visual_notes` — Visual direction notes
- `practical_notes` — Production/logistical notes
- `scenes_used` — Array of scene references (auto-populated)
- `reference_images` — Array of image paths
- `created` — Creation date (optional)

#### Project Types
Each project has a `type` field that determines its structure:
- `screenplay-series` — Multi-episode TV series (uses episodes → sequences → scenes)
- `standalone-film` — Single film (scenes reference project directly, no episodes)
- `book` — Prose work with chapters (uses chapters → beats)

### `plots`
Plot and subplot threads. A single collection handles both via the `plotType` field (`main` or `sub`). Subplots can optionally reference a parent plot via `parentPlot`. Scenes, chapters, and beats all carry a `plots` array referencing which threads they advance.

#### Plot Structure and References
- **Direct references preferred:** Beats, scenes, and episodes should reference actual plot entries via `reference("plots")` rather than hardcoded A/B/C enums. This allows renaming, reordering, and expanding plots without breaking references.
- **Season-long vs. episode-level:** Use `plotLevel` (A/B/C/D) for high-level pitch/marketing structure. Use episode-level fields for runtime prioritization (see Episodes section below).

#### Plot Fields
- `title` — Plot title
- `project` — Project reference
- `plotType` — `"main"` or `"sub"`
- `plotLevel` — A/B/C/D for season-long structure (optional, for pitch docs)
- `parentPlot` — Optional reference to a parent plot (for subplots)
- `summary` — One-sentence plot description
- `themes` — Array of theme references


---


## Screenplay hierarchy

### `episodes`
Episodes in a screenplay series. Only used when the project type is `screenplay-series`. For standalone films there are no episodes — scenes reference the project directly.

#### Episode Fields
- `title` — Episode title
- `project` — Project reference
- `episodeNumber` — Sequential episode number
- `logline` — Episode logline (optional)
- `status` — Episode status ("outline", "first-draft", "revised", "locked")
- `themes` — Array of theme references

#### Episode-Level Plot Prioritization
Episodes can declare which plots are dominant, active, or anchoring tension without hardcoding A/B/C enums. All fields reference actual plot entries for flexibility.

##### Episode Plot Fields
- `dominantDriver` — Optional reference to the plot providing the primary agency and visible tension this episode
- `activePlots` — Array of plot references that have scenes/progression this episode (3–4 recommended)
- `tensionAnchor` — Optional reference to the plot whose emotional stakes will peak this episode

##### Usage Examples
```yaml
---
# Episode 3 is dominated by the Beatles' creative peak
dominantDriver: her-majestys-displeasure/beatles-creative-fracture
activePlots:
  - her-majestys-displeasure/crown-covert-war
  - her-majestys-displeasure/beatles-creative-fracture
  - her-majestys-displeasure/klaus-infiltration
  - her-majestys-displeasure/queen-passive-resistance
tensionAnchor: her-majestys-displeasure/beatles-creative-fracture
---
```

This enables queries like:
- "Show me all E-driven episodes"
- "List episodes where Ringo immunity subplot is active"
- "Which episodes peak on the conspiracy's tension?"

### `sequences`
An optional grouping layer between episode and scene. Skip freely for projects that go straight from episode to scene.

#### Sequence Fields
- `title` — Sequence title
- `project` — Project reference
- `episode` — Optional episode reference
- `sequenceNumber` — Sequential sequence number
- `description` — Sequence description (optional)

### `scenes`
The core unit of a screenplay. Each scene references its project, optionally an episode and sequence, and a location. The `heading` field stores the full scene heading string (e.g. `"INT. TWICKENHAM FILM STUDIOS - DAY"`). Scenes carry `characters` and `plots` arrays for cross-querying. The MDX body is the screenplay content.

#### Scene Fields
- `title` — Scene title (defaults to "Untitled")
- `heading` — Full scene heading (e.g. "INT. BUCKINGHAM PALACE - DAY")
- `project` — Project reference
- `episode` — Episode reference (for series)
- `sequence` — Sequence reference (optional)
- `sceneNumber` — Sequential scene number
- `intOrExt` — "INT", "EXT", "INT/EXT"
- `location` — Array of location references
- `timeOfDay` — "DAY", "NIGHT", "DAWN", "DUSK", "CONTINUOUS", "LATER", "MOMENTS LATER"
- `characters` — Array of character references
- `plots` — Array of plot references this scene advances
- `themes` — Array of theme references
- `synopsis` — Scene summary
- `pageCount` — Estimated page count (optional)
- `status` — "outline", "first-draft", "revised", "locked"

### `beats`
Individual plot points. Beats can advance multiple plot threads simultaneously and are optionally anchored to the scene or chapter where they occur. This models how single scenes often serve multiple narrative functions.

#### Beat Definition and Core Rules

A **beat** is the smallest unit of **strategic change** in a scene. A beat only exists when a character **changes how they are trying to win**.

**Primary Filter**: Before creating a beat, validate: "Did a character change their strategy?"
- YES → create a beat
- NO → merge with previous beat

**Causality Rule**: A beat must be caused by the owner's action. Structure must be: `owner action → causes → outcome`

**Dominant Strategy Rule**: At any point in a scene, one character's strategy is dominant. Only create a new beat when:
- Control shifts to a new character, OR
- Current dominant character changes strategy

**Pressure Test**: A beat must apply pressure to another character or system. Ask: "Who is being pushed, challenged, or forced to respond?" If answer = no one → invalid beat

#### Required Beat Structure

Each beat must include: `Objective → Action → Outcome`

**Objective** - What the owner wants *in this moment*

**Action** - The tactic used (must be a **strong verb**)
- ❌ weak verbs: says, talks, asks, reacts
- ✅ strong verbs: deflects, challenges, reframes, provokes, concedes, escalates

**Outcome** - What **actually changed** (must be externally observable and irreversible within scene)
- Valid: someone changes behavior, power shifts, decision is locked, stakes are redefined, relationship changes
- Invalid: "continues", "tension increases" (without behavior change), "they keep talking"

#### Beat Ownership (STRICT)

Each beat must have exactly **one owner**: The character who **forces change**

**Owner Definition**: The owner is initiating pressure, applying a tactic, causing outcome
**Owner is NOT**: speaker with most dialogue, "focus" of scene, passive observer

**Ownership Test**: Ask "Who is trying to win this moment?" That character = `owner`

**Observer Rejection Rule**: Observing, watching, or listening is NOT a valid action.
- ❌ Invalid: watches, observes, listens, considers, is intrigued
- ✅ Valid only if it leads to: a decision, a reframe, a tactic applied

#### Beat Fields
- `project` — Project reference
- `scene` — Optional scene reference (screenplay)
- `chapter` — Optional chapter reference (book)
- `objective` — What is character trying to achieve in THIS beat (optional)
- `action` — The tactic used (verb-driven: persuade, deflect, threaten) (optional)
- `outcome` — What changes as a result (optional)
- `owner` — Array of character references - Who is driving this beat (character forcing change)
- `summary` — One-line dramatic summary (required)
- `plots` — Array of plot objects with their specific narrative data (at least one required)
- `beatType` — Overall dramatic function when multiple plots are involved (optional)
- `tension` — Overall tension level when multiple plots are involved (optional)
- `themes` — Array of theme references

#### Beat Reference System
- **Required `plots` field:** Each beat must reference at least one plot via `plots: z.array(z.object({plot: reference("plots"), ...}))`
- **Multiple plots supported:** Single beat can advance multiple plot threads simultaneously  
- **Plot-specific data:** Each plot connection includes its own tension, beat type, and beat number
- **Optional anchoring:** Beats can reference either a `scene` OR a `chapter`, never both
- **Tension tracking:** Tension levels are tracked within each plot object for graphing plot arcs

#### Beat Types and Interpretation

Allowed values: `setup`, `advancement`, `escalation`, `turn`, `revelation`, `decision`, `evolution`, `payoff`

**Interpretation**:
- **setup** → establishes baseline
- **advancement** → progresses direction
- **escalation** → raises pressure
- **turn** → changes direction
- **revelation** → exposes truth
- **decision** → locks behavior
- **evolution** → reframes meaning
- **payoff** → resolves or exits

**Decision vs Action Rule**:
- Decision beat: locks future behavior
- Action beat: executes tactic
- If decision + action happen immediately → one beat

#### Beat Density and Validation

**Target Range**:
- Low-density: 3–5 beats
- Standard: 5–8 beats
- High-density: 8–12 beats

**Compression Rules**: If a scene exceeds 8 beats, ask: "Are any beats just extensions of the same tactic?" If yes → merge

**Validation Checklist** for each beat:
- [ ] Has exactly ONE owner
- [ ] Owner applies a tactic
- [ ] Action is a strong verb
- [ ] Outcome is causal
- [ ] Outcome changes something real
- [ ] Applies pressure
- [ ] Not observational
- [ ] Not duplicating tactic
- [ ] Cannot be merged

#### Failure Modes (Reject Conditions)

**Over-segmentation**: splitting one exchange into multiple beats
**Passive beats**: no one driving change
**Observer beats**: watching, noticing, reacting
**Topic-based beats**: labeling by subject, not action
**Duplicate tactics**: same strategy repeated

#### Final Principle

A beat is: **A character-driven, causal change in strategy that applies pressure and alters scene**

Everything else is: description, continuation, or noise


---


## Book hierarchy

### `books`
Book-specific metadata tied to a `projects` record of type `book`. Each book has its own status tracking and optional genre and theme tags.

#### Book Fields
- `title` — Book title
- `project` — Project reference
- `genres` — Array of genre tags
- `themes` — Array of theme references
- `status` — Book status ("outline", "drafting", "first-draft", "revised", "complete")

#### Book Status
- `outline` — structural planning phase
- `drafting` — actively writing prose
- `first-draft` — complete manuscript, initial version
- `revised` — edited and improved version
- `complete` — final, polished version

### `chapters`
Chapters carrying prose. Carry `characters`, `locations`, and `plots` reference arrays the same way scenes do, enabling the same kinds of cross-queries. The MDX body is the chapter prose.

#### Chapter Fields
- `title` — Chapter title (optional)
- `project` — Project reference
- `book` — Book reference
- `chapterNumber` — Sequential chapter number
- `characters` — Array of character references
- `locations` — Array of location references
- `plots` — Array of plot references this chapter advances
- `themes` — Array of theme references
- `synopsis` — Chapter summary
- `status` — Chapter status ("outline", "first-draft", "revised", "locked")


---


## Music

### `songs`
Songs can be standalone or part of an album. They contain two parallel representations of chord content:

- `sections` — the chord sheet data. An array of unique section definitions, each with a name (e.g. `"verse"`), an ordered array of chord display names per bar (e.g. `["G", "D", "Em", "B"]`), a bar count, and a repeat count. This is what the chord sheet renderer uses to lay out 4 bars per line with section labels and repeat signs.
- `structure` — the ordered playback sequence of section names (e.g. `["verse", "chorus", "solo", "verse", "bridge"]`). Section names must match the `name` fields in `sections`. This lets the renderer know the full song order without duplicating chord data.
- `chordVoicings` — references to specific chord voicing records. Used for the hover chord diagram feature.

The MDX body is the lyrics, formatted by section.

#### Song Fields
- `title` — Song title
- `album` — Optional album reference
- `keyRoot` — Key root note (e.g., "G", "C#", "Bb")
- `keyMode` — "major" or "minor"
- `tempo` — Tempo in BPM (optional)
- `timeSignatureTop` — Time signature numerator (defaults to 4)
- `timeSignatureBottom` — Time signature denominator (defaults to 4)
- `chordVoicings` — Array of chord voicing references for hover diagrams
- `structure` — Ordered playback sequence of section names
- `sections` — Unique section definitions with chord progressions
- `themes` — Array of theme references
- `chordSheetUrl` — Optional URL to external chord sheet
- `status` — Song status ("idea", "demo", "arranged", "recorded", "released")


---


## Standalone writings

### `poems`
Individual poems. Can optionally belong to a `set`. Carries a `form` field (sonnet, free verse, haiku, etc.). The MDX body is the poem text.

#### Poem Fields
- `title` — Poem title
- `set` — Optional reference to a set
- `form` — Poetic form (optional)
- `themes` — Array of theme references
- `status` — Poem status ("draft", "revised", "complete")
- `writtenAt` — Date written (optional)

### `short-stories`
Short fiction. Can optionally belong to a `set`. Can optionally reference a `companionProject` — use this when the story is background material or a companion piece to a screenplay or book. The MDX body is the story prose.

#### Short Story Fields
- `title` — Story title
- `set` — Optional reference to a set
- `companionProject` — Optional reference to a related project
- `wordCount` — Word count (optional)
- `themes` — Array of theme references
- `status` — Story status ("draft", "revised", "complete")
- `writtenAt` — Date written (optional)

### `posts`
Individual blog posts. Every post must belong to a `post-series`. The `position` field is only meaningful when the parent series has `sortBy: "position"`. The MDX body is the post content.

#### Post Fields
- `title` — Post title
- `postSeries` — Reference to post-series
- `position` — Position in series (for manual ordering)
- `excerpt` — Post excerpt (optional)
- `publishedAt` — Publication date (optional)
- `updatedAt` — Last updated date (optional)
- `tags` — Array of tags
- `themes` — Array of theme references
- `status` — Post status ("draft", "published")

### `reviews`
Film, TV, and other media reviews. Each review belongs to a `post-series` and carries credits, ratings, and TMDB metadata fields. The `cast` field is an array of references to `actors` records, populated automatically by the enrichment scripts.

#### Review Categories
- `book` — book reviews
- `movie` — film reviews
- `album` — music album reviews
- `game` — video game reviews
- `restaurant` — restaurant reviews
- `product` — product reviews
- `tv` — television series reviews

#### Review Status
- `draft` — unpublished, in progress
- `published` — live and visible

#### Core Identity Fields
- `title` — Review title (required)
- `subtitle` — Review subtitle (optional)
- `postSeries` — Reference to post-series (optional)
- `category` — Review category (required)
- `pubDate` — Publication date (required)
- `status` — Review status (defaults to "draft")

#### Taxonomy Fields
- `tags` — Array of tags (defaults to empty array)
- `themes` — Array of theme references (defaults to empty array)
- `heroImage` — Hero image using Astro's image() helper (optional)

#### TV-Specific Fields
- `season` — Season number (positive integer, optional)
- `episode` — Episode number (positive integer, optional)
- `episodes` — Total episode count (positive integer, optional)
- `channel` — TV channel (optional)

#### TMDB Integration
Reviews integrate with The Movie Database (TMDB) for automatic enrichment:
- `tmdbId` — TMDB identifier
- `tmdbType` — "movie" or "tv"
- `tmdbSlug` — URL-friendly identifier
- `year` — release year (4-digit string)
- `poster` — local path to downloaded poster image
- `overview` — brief description (max 500 chars)

#### External Ratings
- `url` — Review URL (optional)
- `imdbId` — IMDb identifier
- `imdbRating` — IMDb rating (0-10)
- `rottenTomatoesId` — Rotten Tomatoes identifier
- `rottenTomatoesRating` — Rotten Tomatoes rating (0-100)

#### Credits Fields
- `cast` — References to actor records (populated by enrich-actors.ts)
- `writers` — Array of writer names (optional)
- `directors` — Array of director names (optional)
- `productionCompanies` — Array of production company names (optional)

#### Enrichment workflow

Reviews are partially manual and partially automated. The two enrichment scripts work in sequence:

1. Create a review stub in `src/content/reviews/{series}/{slug}.mdx` with at minimum `title`, `category`, and `pubDate`.
2. Run `pnpm run enrich:tmdb` → fetches TMDB data and writes `tmdbId`, `tmdbType`, `tmdbSlug`, `poster`, `year`, `overview`, and the temporary `castDetailed` array into the review frontmatter.
3. Run `pnpm run enrich:actors` → reads `castDetailed` from all reviews, creates actor files in `src/content/actors/`, downloads profile images, writes the final `cast` slug array back into each review, and removes the temporary `castDetailed` field.

After step 3, the review is fully enriched: `castDetailed` is gone, `cast` contains actor slugs that Astro can resolve, and each actor has their own file with bio and image.

`castDetailed` is intentionally kept in the schema as an optional field so Astro doesn't reject reviews that are mid-pipeline (between steps 2 and 3). Once a review has been through step 3, `castDetailed` will not be present.


---


## How Astro resolves references

References return an object with `collection` and `id` — not the full record. To get the full data, call `getEntry()` or `getEntries()`.

### Single reference

```ts
import { getEntry } from "astro:content";

const location = await getEntry(scene.data.location);
// location.data.name, location.data.intOrExt, etc.
```

### Array of references

```ts
import { getEntries } from "astro:content";

const characters = await getEntries(scene.data.characters);
```

### Filtering across a collection

```ts
import { getCollection } from "astro:content";

const allScenes = await getCollection("scenes");

const nigelsScenes = allScenes.filter(scene =>
  scene.data.project.id === "her-majestys-displeasure" &&
  scene.data.characters.some(c => c.id === "her-majestys-displeasure/nigel-finch")
);
```

This is the pattern for most queries — `getCollection` plus array filter methods. It scales fine for the volume of content here.


---


## Adding a new collection later

1. Define it in `content.config.ts` with `defineCollection` and a Zod schema
2. Add it to the `export const collections` object at the bottom of the file
3. Create the corresponding folder in `src/content/`
4. Use `reference("collection-name")` for any relationships to existing collections

Clear the `.astro` cache folder if TypeScript types don't update immediately after adding a new collection.