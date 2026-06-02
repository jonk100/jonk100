# Technical Glossary Entry Generation Workflow (`/glossary`)

Use this workflow guide whenever the user invokes the `/glossary` shortcut command. This details how to research, outline, obtain approval, and write a premium, highly educational, glossary entry in the `src/content/glossary` directory.

---

## 1. Context Gathering & Research Phase

You should receive a term with the slash command, e.g. `/glossary abstract syntax tree`.

The task is to research the term and its meaning, and then outline the definition, history, context, and related terms in the structure defined below.

## 2. Glossary Entry Structure

### a. Output File

The entry will be written to `src/content/glossary/{term}.mdx`

### b. Frontmatter

The frontmatter of the mdx file will follow the schema outlined in `src/content.config.ts`. The fields are:

- `title`
- `shortDefinition` - one sentence definition of the term
- `definition` - expanded definition/explanation of the term
- `categories` - 
- `tags` - 
- `level` - beginner | intermediate | advanced
- `related` - related terms, either in the glossary or to be added
- `prerequisites` - prerequisite terms / concepts, either in the glossary or to be added
- `difficultyScore` - (easy: 1, maddeningly difficult: 10)
- `description` - of the entry, for SEO ("Learn how....")
- `keywords` - for search, for the entry
- `hasCode`
- `hasDiagrams`
- `interactive`

### c. Introduction

The introduction should briefly and concisely desribe the term and introduce some of its uses in a clever way using a subtle analogy. It should be three to five concise but informative sentences.

### d. History

Talk about what was used for the term's purpose before it was available, and explain the problem or reason the term was needed and/or created. Use code examples, ordered and unordered lists, additional subheading, and other formatting to make the history section engaging and informative. It should be at least 4 paragraphs and should contain at least three of the previously mentioned formatting methods.

### e. Detail #1

In-depth section covering one detail about the term. Use at least 1 code example, at least two subheadings, at least one ordered or unordered list, and at least one additional paragraph to explain the detail in another way.

### f. Detail #2

In-depth section covering a second detail about the term. Use at least 1 code example, at least one subheading, at least one diagram, and at least one additional paragraph to explain the detail in another way. Vary the structure of this section in relation to the previous section.

### g. Detail #3

A third detail for deep dive. At least 1 subheading, at least one diagram or list, and at least two additional paragraphs that tie together sections e, f, and g. 

### h. The significance or importance of the term today

With at least two subheadings of 2-3 paragraphs

### i. Use cases for the term

With at least two subheadings of 2-3 paragraphs - shoot for at least 1 outdated use case and at least 2 modern use cases.

### k. Related terms (glossary cluster)

At least five related terms that would make good glossary entries or are already glossary entries. Check the `src/content/glossary` directory and use the entries available in there for extra context and examples. Use at least one term that isn't in the glossary yet. If a related term is already in the glossary, backlink to that term and explain the relation. If it's a new term - define the term, explain the relation, and add the new term to the `glossary-todo.md` file in `docs`.

### j. Related Concepts - Comparisons

Find as many related terms or concepts (from above or new) as possible (five or more) and create at least one table and at least one paragraph comparing the term to each related term or concept. At the end of the section, write at least two paragraphs about where the term fits in relation to all of the related concepts together.

### k. Mental Model, Mind Maps, Diagrams

Explain the mental model to use to recall the knowledge in the glossary entry (in more casual language) and provide a diagram, mind map, and/or illustration of some kind to help the user remember the term.

### l. Example (If Applicable)

If applicable, provide an example of how the term is used in a real-world scenario. Usually with code. Make it as accessible and as detailed as possible.

### m. Conclusion

Conclude the glossary entry with a summary of the term and its importance, using an unordered list to stress key concepts and important pieces of the entry.




