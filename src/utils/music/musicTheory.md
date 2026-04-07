# Music Theory Reference Guide

This document explains the architecture of the `musicTheory.ts` file and provides a glossary of terms used in this workbench.

## Core Concepts

### 1. The Chromatic Scale
The foundation of Western music. It consists of 12 notes, each a "half-step" (or one fret) apart. In our code, we track both **Sharps (#)** and **Flats (b)** to account for different keys and proper musical spelling.

### 2. Intervals
An interval is the distance between two notes. 
- **The Root (R/1):** Your starting note.
- **The 3rd:** The "color" of the chord. A **Major 3rd** sounds "bright/happy," while a **Minor 3rd** sounds "dark/sad."
- **The 5th:** The "anchor" of the chord. A **Perfect 5th** provides stability.



### 3. Scale Formulas
A scale is a sequence of intervals.
- **Major (Ionian):** The standard "Do-Re-Mi" scale. Formula: `1, 2, 3, 4, 5, 6, 7`.
- **Natural Minor (Aeolian):** The standard minor scale. Formula: `1, 2, b3, 4, 5, b6, b7`.
- **Pentatonic:** A 5-note scale used heavily in guitar solos because it removes the "tension" notes (the 4th and 7th).

### 4. Chords & Voicing
A chord is built by stacking intervals (usually 1sts, 3rds, and 5ths) from a scale.
- **Triads:** The simplest 3-note chords.
- **Barre Chords:** On guitar, these are movable shapes. We categorize them as **E-shape (-1)** or **A-shape (-2)** based on which string the root note is on.



---

## Using This Data in the Workbench

### Transposition Logic
By using the `CHROMATIC_SCALE` arrays, the workbench can programmatically move a song from one key to another. To transpose up 2 semitones, the code finds the index of the current note and adds 2.

### Fretboard Mapping
Because `GUITAR_FRETBOARD` (now in your domain data) stores strings as arrays of notes, we can cross-reference it with the `SCALES` object to highlight specific patterns.
* **Logic:** To show "G Major Pentatonic," the system gets the notes `G, A, B, D, E` and highlights every instance of those strings/frets in the UI.

### Diatonic Progression Suggestion
In music, certain chords "belong" in certain keys. 
- In the Key of **C Major**, the **I** chord is C, the **IV** is F, and the **V** is G. 
- Using the `DIATONIC_MAJOR_MAP`, the workbench can suggest chords that will naturally sound good together for songwriting.



[Image of Circle of Fifths diagram]


---

## Glossary of Terms

| Term | Definition |
| :--- | :--- |
| **Root** | The primary note upon which a scale or chord is built. |
| **Semitone** | The smallest interval in Western music; equal to one fret on a guitar. |
| **Diatonic** | Notes or chords that occur naturally within a specific key without "accidentals" (notes outside the key). |
| **Enharmonic** | Notes that sound the same but have different names (e.g., C# and Db). |
| **Roman Numeral Analysis** | A system of naming chords by their relationship to the key (e.g., a "ii-V-I" progression). |
| **Quality** | The "flavor" of a chord (Major, Minor, Diminished, etc.). |
| **Voicing** | The specific arrangement of notes in a chord (which note is highest, which is lowest). |