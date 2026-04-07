#!/bin/zsh

# Configuration
OUTPUT_DIR="../../src/content/chords"
mkdir -p "$OUTPUT_DIR"

# Define the open chords data
# Format: "NewFileName|DisplayName|Fingering|Frets|Notes"
chords=(
  "c-0|C|[0, 3, 2, 0, 1, 0]|[-1, 3, 2, 0, 1, 0]|[\"x\", \"C\", \"E\", \"G\", \"C\", \"E\"]"
  "a-0|A|[0, 0, 2, 3, 4, 0]|[-1, 0, 2, 2, 2, 0]|[\"x\", \"A\", \"E\", \"A\", \"C#\", \"E\"]"
  "g-0|G|[3, 2, 0, 0, 0, 4]|[3, 2, 0, 0, 0, 3]|[\"G\", \"B\", \"D\", \"G\", \"B\", \"G\"]"
  "e-0|E|[0, 2, 3, 1, 0, 0]|[0, 2, 2, 1, 0, 0]|[\"E\", \"B\", \"E\", \"G#\", \"B\", \"E\"]"
  "d-0|D|[0, 0, 0, 1, 3, 2]|[-1, -1, 0, 2, 3, 2]|[\"x\", \"x\", \"D\", \"A\", \"D\", \"F#\"]"
  "am-0|Am|[0, 0, 2, 3, 1, 0]|[-1, 0, 2, 2, 1, 0]|[\"x\", \"A\", \"E\", \"A\", \"C\", \"E\"]"
  "em-0|Em|[0, 2, 3, 0, 0, 0]|[0, 2, 2, 0, 0, 0]|[\"E\", \"B\", \"E\", \"G\", \"B\", \"E\"]"
  "dm-0|Dm|[0, 0, 0, 2, 3, 1]|[-1, -1, 0, 2, 3, 1]|[\"x\", \"x\", \"D\", \"A\", \"D\", \"F\"]"
)

echo "Cleaning up old '-open' files in $OUTPUT_DIR..."

# 1. FIND AND REMOVE OLD '-open.mdx' FILES
# Using 'N' in the glob to avoid errors if no files match
for old_file in $OUTPUT_DIR/*-open.mdx(N); do
    echo "Removing: $(basename $old_file)"
    rm "$old_file"
done

echo "Generating Open Chords with '-0' naming convention..."

for entry in $chords; do
  IFS='|' read -r filename display fingering frets notes <<< "$entry"
  
  full_path="$OUTPUT_DIR/${filename}.mdx"

  # 2. SKIP IF NEW FILE ALREADY EXISTS
  if [[ -f "$full_path" ]]; then
    echo "Skipping: ${filename}.mdx (already exists)"
    continue
  fi

  # 3. GENERATE NEW FILE
  cat <<EOF > "$full_path"
---
displayName: $display
voicingLabel: open
baseFret: 1
fingering: $fingering
frets: $frets
notes: $notes
---
EOF
  echo "Created:  ${filename}.mdx"
done

echo "Process complete."