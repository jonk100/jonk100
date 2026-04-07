#!/usr/bin/env zsh

set -euo pipefail

if [[ $# -ne 2 ]]; then
    echo "Usage: $0 <source_directory> <output_file>"
    exit 1
fi

# Convert to absolute paths to prevent infinite loops
source_dir=$(realpath "$1")
output_file=$(realpath "$2")

# Check if directory exists
if [[ ! -d "$source_dir" ]]; then
    echo "Error: '$1' is not a directory."
    exit 1
fi

# Use the (n) qualifier for numeric/natural sorting
files=("$source_dir"/*(N.n))

if [[ ${#files[@]} -eq 0 ]]; then
    echo "No files found in '$source_dir'"
    exit 0
fi

# Clear/Create output file
: > "$output_file"

echo "Combining ${#files[@]} files in numeric order..."

for file in "${files[@]}"; do
    # Skip the output file if it's inside the source directory
    [[ "$file" == "$output_file" ]] && continue
    
    filename=$(basename "$file")
    echo "Processing: $filename"
    
    {
        echo "=== File: $filename ==="
        echo ""
        cat "$file"
        echo -e "\n"
    } >> "$output_file"
done

echo "Done! Combined into '$2'"
