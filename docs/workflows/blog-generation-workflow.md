# Technical Blog Generation Workflow (`/blogthat`)

Use this workflow guide whenever the user invokes the `/blogthat` shortcut command. This details how to research, outline, obtain approval, and write a premium, highly educational, first-person developer blog post.

---

## 1. Context Gathering & Research Phase
To ensure the post is deeply grounded in the real details of the implementation:
1. **Git Commit History**: Run `git log -n 5` or similar commands to examine the latest code adjustments.
2. **Planning Documents**: Locate and read the implementation plans (`implementation_plan.md`), task sheets (`task.md`), and walkthrough logs (`walkthrough.md`) in the active app data directory.
3. **Conversation Logs**: Scan the conversation history or recent logs to find the core dialogue and debugging iterations.

---

## 2. Topic Sourcing & Narrative Architecture
1. **Identify the Core Breakthrough**: Choose the most interesting, technically advanced, or elegant engineering task recently completed (e.g., custom AST plugins, responsive grids, shared layout variants, combobox refactors).
2. **The "Dialogue-to-Monologue" Reframing**: Reframe the user's questions, critiques, and feedback as the author's **own internal developer monologue and struggles**.
   - *Example User Question*: *"Why is there a tab indentation on the first line?"*
   - *Reframed Internal Monologue*: *"Wait, I booted up the dev server and noticed a stray tab indentation on the first line of my code block. Why is that? Ah! HTML `<pre>` tags preserve whitespace literally..."*
3. **Architectural Choices & Debugging Battles**: Focus on both:
   - **The "Why" (Architectural Decisions)**: Design tokens vs variants, build-time vs runtime execution, DRY code systems.
   - **The "How" (Debugging Struggles)**: esbuild parsing errors, CSS specificity overrides, JSX escaping issues.

---

## 3. Mandatory Outlining & Approval Gate
Before writing the actual post, the agent **MUST** present the proposed title, description, and key outline sections to the user.

> [!IMPORTANT]
> **STOP and wait for the user's explicit confirmation** on the proposed title and outline before creating or writing any file in the blog directory.

---

## 4. Writing Style & MDX Guidelines
Once the user approves the topic and title, create the MDX file under `src/content/blog/{slug}.mdx` adhering to the following rules:

1. **Frontmatter Conformance**: Ensure the post strictly conforms to the `blog` collection schema in `src/content.config.ts`:
   ```yaml
   ---
   title: "A Compelling Geometric Title"
   description: "A summary that makes developers want to click and learn."
   pubDate: YYYY-MM-DD
   tags: ["Astro", "Web Development", "Design Systems"]
   ---
   ```
2. **Escaping Nested Code Blocks (4-Backtick Rule)**:
   If the blog post showcases markdown examples containing triple-backtick blocks (e.g. ` ```astro ... ``` `), the outer code block in MDX **MUST** be declared using **four backticks** (````) to prevent the compiler from closing the block early and throwing syntax errors:
   ````markdown
   ````mdx
   <ComponentPreview title="Example">
     ```astro
     <Link href="#" />
     ```
   </ComponentPreview>
   ````
   ````
3. **Tone**: Informative, educational, matter-of-fact, concise, yet casual and accessible.

---

## 5. Verification Phase
After writing the `.mdx` file:
1. Proactively run `pnpm run build` to confirm that the new blog post parses cleanly and the static route is generated with zero errors.
2. If any compilation or MDX syntax errors occur, self-correct them immediately.
