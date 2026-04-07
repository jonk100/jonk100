# Breaking a Scene into Beats (AI-Optimized Spec)

This document defines a **strict, machine-friendly system** for breaking scenes into beats and storing them in the `beats` collection.

It is designed to:
- reduce over-segmentation
- enforce meaningful dramatic change
- ensure clean ownership
- map directly to your Astro content schema

---

# 1. Definition

A **beat** is the smallest unit of **strategic change** in a scene.

> A beat only exists when a character **changes how they are trying to win**

If the tactic does not change → **do not create a new beat**

---

# 2. Core Rule (Primary Filter)

Before creating a beat, validate:

> “Did a character change their strategy?”

If:
- YES → create a beat  
- NO → merge with previous beat  

---

## Causality Rule (MANDATORY)

A beat must be caused by the owner's action.

Structure must be:

`owner action → causes → outcome`

If the outcome would happen anyway → invalid beat

---

## Dominant Strategy Rule (CRITICAL)

At any point in a scene, one character’s strategy is dominant.

Only create a new beat when:
- control shifts to a new character  
OR
- the current dominant character changes strategy  

If the same character continues escalating the SAME strategic line:
- DO NOT create a new beat  
- extend the existing beat  

---

## Single Move Test

Ask:

> “If I removed the boundary between these two beats, would anything be lost?”

If NO → they are the SAME beat  
If YES → keep them separate  

---

## Escalation vs Extension Rule

Escalation = new beat  
Extension = same beat  

Escalation requires:
- new tactic  
- new target  
- new level of consequence  

Extension includes:
- elaboration  
- examples  
- justification  
- rhetorical expansion  

If a character is explaining the same idea → SAME beat  

---

# 3. Required Beat Structure

Each beat must include:

`Objective → Action → Outcome`

---

## Fields

- **objective**  
  What the owner wants *in this moment*

- **action**  
  The tactic used (must be a **verb**)

- **outcome**  
  What **actually changed**

---

## Action Field Rule

Action must be:

- a deliberate tactic  
- expressed as a strong verb  

❌ weak verbs:
- says  
- talks  
- asks  
- reacts  

✅ strong verbs:
- deflects  
- challenges  
- reframes  
- provokes  
- concedes  
- escalates  

---

## Outcome (STRICT)

Outcome must be externally observable and irreversible (within the scene).

Valid outcomes:
- someone changes behavior  
- power shifts  
- a decision is locked  
- stakes are redefined  
- a relationship changes  

Invalid outcomes:
- “continues”  
- “tension increases” (without behavior change)  
- “they keep talking”  

---

# 4. Beat Ownership (STRICT)

Each beat must have exactly **one owner**:

> The character who **forces the change**

---

## Owner Definition

The owner is:
- initiating pressure  
- applying a tactic  
- causing the outcome  

The owner is NOT:
- the speaker with most dialogue  
- the “focus” of the scene  
- a passive observer  

---

## Ownership Test

Ask:

> “Who is trying to win this moment?”

That character = `owner`

---

## Ownership vs Reaction

Structure:

`Actor (owner) → applies tactic → creates outcome`  
`Reactor → responds inside same beat`

A response does **not** create a new beat unless:
- it introduces a **new strategy**

---

## Pressure Test (MANDATORY)

A beat must apply pressure to another character or system.

Ask:

> “Who is being pushed, challenged, or forced to respond?”

If answer = no one → invalid beat

---

## Observer Rejection Rule

Observing, watching, or listening is NOT a valid action.

❌ Invalid:
- watches  
- observes  
- listens  
- considers  
- is intrigued  

✅ Valid only if it leads to:
- a decision  
- a reframe  
- a tactic applied  

---

## Invalid Beats

Reject or merge beats if:

- no clear owner exists  
- multiple characters equally drive change  
- the moment is observational only  

---

# 5. Ownership and Schema Mapping

You are using:

`owner: reference("characters")`

---

## Implications

- Every beat owner must map to a valid character entry  
- No free-text owners allowed  
- No “institution” unless modeled as a character  

---

## Optional Convention (Recommended)

If needed, create abstract characters:
- “the crown”
- “the press”
- “the public”

This preserves:

`owner → reference("characters")`

---

# 6. Beats vs Plots (CRITICAL DISTINCTION)

A beat has:

`1 owner`  
`N plot effects`

---

## Rule

`owner ≠ plot`

- **owner** = who causes change  
- **plots[]** = what that change affects  

---

## Example

```yaml
owner: John

plots:
  - plot: crown-threat
    beatType: escalation

  - plot: band-fracture
    beatType: advancement
````

---

# 7. Beat Creation Algorithm (AI Procedure)

Follow in order:

---

## Step 1 — Identify Scene Objective

Define:

> What is the scene trying to accomplish overall?

---

## Step 2 — Scan for Strategy Shifts ONLY

### Create a beat ONLY when:

* tactic changes (persuade → threaten)
* interpretation changes (neutral → hostile)
* power shifts
* stakes are introduced or reframed
* a decision locks behavior
* a character shifts from reaction → strategy
* a different character assigns meaning to an action

---

## Interpretation Beats (IMPORTANT)

A new beat is created when a character assigns NEW MEANING to an event.

Example:

* Event: John jokes
* Beat: Philip interprets it as ideological attack

Rule:
Interpretation that changes stakes = new beat

---

## Do NOT create beats for:

* description
* atmosphere alone
* internal state without action

---

## Dialogue Does NOT Create Beats

A new beat is NOT created just because:

* a new character speaks
* a new idea is expressed
* tone shifts slightly

A beat ONLY exists if:

* strategy for “winning” changes

---

## Group Beats (STRICT)

Multiple characters can appear in one beat ONLY if:

* they execute the SAME strategy
* toward the SAME objective

Otherwise → split into separate beats

Example:

❌ Paul (control) + Ringo (joke) → NOT same beat
✅ Reporters shouting → same beat

---

## Step 3 — Collapse Micro-Beats

If two moments:

* belong to the same tactic
* or happen within one exchange

→ merge them

---

## Step 4 — Assign Owner (MANDATORY)

`if owner is unclear → delete or merge beat`

---

## Step 5 — Validate Outcome

Each beat must produce:

* new information
* new power dynamic
* new direction

If outcome is weak → delete or merge

---

## Scene Spine Rule

Every beat must connect to the scene’s core conflict.

If a beat does not:

* advance
* resist
* or reframe

→ remove it

---

# 8. Beat Density Rules

### Target Range

* Low-density: 3–5 beats
* Standard: 5–8 beats
* High-density: 8–12 beats

---

## Compression Rules

If a scene exceeds 8 beats:

Ask:

> “Are any beats just extensions of the same tactic?”

If yes → merge

---

## Merge ONLY when:

`same character + same tactic + continuous intent`

---

## One Beat Per Turn Rule (DEFAULT)

A character speaking continuously usually owns ONE beat.

Only split if:

* they change strategy mid-speech

---

## Scene Phase Rule

Group beats into phases:

* Problem definition
* Strategy debate
* Decision

Each phase should usually contain:
1–2 beats

If a phase has 3+ beats:
→ likely over-segmented

---

# 9. Beat Types (Schema-Aligned)

Allowed values:

* `setup`
* `advancement`
* `escalation`
* `turn`
* `revelation`
* `decision`
* `evolution`
* `payoff`

---

## Interpretation (Strict)

* **setup** → establishes baseline
* **advancement** → progresses direction
* **escalation** → raises pressure
* **turn** → changes direction
* **revelation** → exposes truth
* **decision** → locks behavior
* **evolution** → reframes meaning
* **payoff** → resolves or exits

---

## Decision vs Action Rule

Decision beat:

* locks future behavior

Action beat:

* executes tactic

If decision + action happen immediately → one beat

---

## Beat Type Sanity Check

If 3+ consecutive beats share same type:

→ review for:

* over-segmentation
* weak differentiation

---

# 10. Final Beat Rule

The last beat must:

* lock a decision
* OR reframe meaning
* OR transition the story

If it only “ends” → weak scene

---

# 11. Validation Checklist (ENFORCED)

For each beat:

* [ ] Has exactly ONE owner
* [ ] Owner applies a tactic
* [ ] Action is a strong verb
* [ ] Outcome is causal
* [ ] Outcome changes something real
* [ ] Applies pressure
* [ ] Not observational
* [ ] Not duplicating tactic
* [ ] Cannot be merged

---

# 12. Failure Modes (Reject Conditions)

Reject or fix if:

### Over-segmentation

* splitting one exchange into multiple beats

### Passive beats

* no one driving change

### Observer beats

* watching, noticing, reacting

### Topic-based beats

* labeling by subject, not action

### Duplicate tactics

* same strategy repeated

---

# 13. Hard Rules

## Remove Passive Beats

A beat MUST include:

* objective
* action
* outcome

If missing → delete

---

## Internal State ≠ Beat

❌ Not valid:

* feels
* notices
* is calm
* is angry

✅ Only valid if:
→ it causes strategy change

---

## Every Major Argument Must Appear

If a character introduces:

* a new plan
* a new model
* a new strategy

→ MUST be its own beat

---

# 14. Schema Alignment Summary

Maps directly to:

```yaml
beats:
  owner → reference("characters")
  objective → string
  action → string
  outcome → string
  plots[] → multi-plot effects
  beatType → enum
```

---

# 15. Final Principle

A beat is:

> **A character-driven, causal change in strategy that applies pressure and alters the scene**

Everything else is:

* description
* continuation
* or noise