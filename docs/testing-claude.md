# By category, what to actually test:

## Primitives & Typography (Icon, Text, Code, SectionLabel, etc.)

These are mostly static — unit tests are fine.

- [] Props render the right classes (variant--${theme}, text--${tone}, etc.)
- [] Slot content renders when no text prop passed
- [] Default props applied when none given
- [] No output of empty class strings (your .filter(Boolean) logic)

## Layout (Stack, Grid, Columns, Inline, etc.)

- [] Gap/align/justify props produce correct classes
- [] Slot content passes through untouched
     as prop changes the rendered HTML tag

## Controls & Input (Button, ButtonGroup, Tabs, all inputs)

- [] Disabled state sets disabled attribute + correct classes
     type, name, value attrs pass through on inputs
- [] ButtonGroup wraps children without adding extra wrappers
- [] RadioGroup/InputGroup — label/input association (for/id)
- [] Switch — renders correct role="switch" and aria-checked

## Feedback (Alert, Badge, Skeleton, Spinner, Toast)

- [] Variant prop changes rendered class
- [] Skeleton/SkeletonGroup — correct count of children rendered
- [] Alert — renders icon slot conditionally
- [] ToastProvider — this one needs Playwright; test show/hide/dismiss

## Overlays & Modal (Popover, Tooltip, Sheet, Modal, AlertDialog)

These need Playwright — they involve focus trapping, dialog role, keyboard nav.

- [] Opens on trigger
- [] Closes on Escape / backdrop click
- [] Focus moves into dialog on open, returns on close
- [] aria-modal, role="dialog", aria-labelledby wired correctly

## Data (Table family)

- [] TableCaption renders as <caption> inside <table>
- [] Scope attrs on TableHeading (col/row)
- [] Passes through arbitrary ...rest props

## Navigation (Breadcrumbs)

- [] aria-label on <nav>
- [] Last item has aria-current="page"
- [] Correct separator rendering