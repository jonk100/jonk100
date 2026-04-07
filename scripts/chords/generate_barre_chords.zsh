#!/zsh

# Configuration
OUTPUT_DIR="../../src/content/chords"
mkdir -p "$OUTPUT_DIR"

# Chromatic scale for note calculation
display_notes=("C" "C#" "D" "D#" "E" "F" "F#" "G" "G#" "A" "A#" "B")

# Base indices (E=4, A=9)
E_INDEX=4
A_INDEX=9

get_note_info() {
    local base_idx=$1
    local fret=$2
    local interval=$3
    local note_idx=$(( (base_idx + fret + interval) % 12 ))
    echo "${display_notes[$((note_idx + 1))]}"
}

echo "Starting generation in $OUTPUT_DIR..."

for fret in {1..8}; do
    for shape_id in 1 2; do
        for type in "major" "minor"; do
            
            if [[ $shape_id -eq 1 ]]; then
                # E-Shape Logic
                root=$(get_note_info $E_INDEX $fret 0)
                voicing="e-shape"
                barre_strings="[1, 6]"
                fingering_major="[1,3,4,2,1,1]"
                fingering_minor="[1,3,4,1,1,1]"
                fret_pattern_major="[$fret,$((fret+2)),$((fret+2)),$((fret+1)),$fret,$fret]"
                fret_pattern_minor="[$fret,$((fret+2)),$((fret+2)),$fret,$fret,$fret]"
                
                n1=$root
                n2=$(get_note_info $E_INDEX $fret 7)
                n3=$root
                n5=$n2
                n6=$root
                [[ "$type" == "major" ]] && n4=$(get_note_info $E_INDEX $fret 4) || n4=$(get_note_info $E_INDEX $fret 3)
                note_array="[\"$n1\", \"$n2\", \"$n3\", \"$n4\", \"$n5\", \"$n6\"]"
            else
                # A-Shape Logic
                root=$(get_note_info $A_INDEX $fret 0)
                voicing="a-shape"
                barre_strings="[2, 6]"
                fingering_major="[-1,1,2,3,4,1]" 
                fingering_minor="[-1,1,2,3,4,1]"
                fret_pattern_major="[-1,$fret,$((fret+2)),$((fret+2)),$((fret+2)),$fret]"
                fret_pattern_minor="[-1,$fret,$((fret+2)),$((fret+2)),$((fret+1)),$fret]"
                
                n1="x"
                n2=$root
                n3=$(get_note_info $A_INDEX $fret 7)
                n4=$root
                n6=$(get_note_info $A_INDEX $fret 7)
                [[ "$type" == "major" ]] && n5=$(get_note_info $A_INDEX $fret 4) || n5=$(get_note_info $A_INDEX $fret 3)
                note_array="[\"$n1\", \"$n2\", \"$n3\", \"$n4\", \"$n5\", \"$n6\"]"
            fi

            m_suffix=""
            [[ "$type" == "minor" ]] && m_suffix="m"
            display_name="${root}${m_suffix}"
            
            # Paths
            old_filename="${(L)root}${m_suffix}-${shape_id}.mdx"
            new_filename="${(L)root//\#/s}${m_suffix}-${shape_id}.mdx"
            
            old_path="$OUTPUT_DIR/$old_filename"
            new_path="$OUTPUT_DIR/$new_filename"

            # 1. REMOVE OLD # VERSION
            if [[ "$old_filename" == *"#"* ]] && [[ -f "$old_path" ]]; then
                echo "Removing: $old_path"
                rm "$old_path"
            fi

            # 2. SKIP IF NEW EXISTS
            if [[ -f "$new_path" ]]; then
                echo "Skipping: $new_filename"
                continue
            fi

            # 3. GENERATE
            if [[ "$type" == "minor" ]]; then
                fingering=$fingering_minor
                fret_list=$fret_pattern_minor
            else
                fingering=$fingering_major
                fret_list=$fret_pattern_major
            fi

            cat <<EOF > "$new_path"
---
displayName: $display_name
voicingLabel: barre ($voicing)
baseFret: $fret
fingering: $fingering
frets: $fret_list
barre:
  finger: 1
  fret: $fret
  strings: $barre_strings
notes: $note_array
---
EOF
            echo "Created:  $new_filename"
        done
    done
done