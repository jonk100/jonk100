set shell := ["zsh", "-ic"]

# @recipe: git-commit
# @desc: add, commit
[group('git')]
git-commit:
    #!/usr/bin/env bash
    set -euo pipefail
    git status --short
    echo
    read -rp "Commit message: " msg
    [ -n "$msg" ] || {
        echo "Commit message required"
        exit 1
    }
    git add .
    git commit -m "$msg"

# @recipe: dev
# @desc: Run dev server
[group('pnpm')]
dev:
    pnpm dev --open
# @recipe: history
# @desc: Fuzzy-search recent zsh history and re-run whatever you pick
[group('sh--')]
history:
    #!/usr/bin/env zsh
    set -euo pipefail
    cmd=$(tac ~/.zsh_history | sed -E 's/^: [0-9]+:[0-9]+;//' | fzf --prompt="History > " --no-sort)
    [[ -n "$cmd" ]] && eval "$cmd"


# @recipe: ai-admd
# @desc: create a directory_index.md file for the current directory
# @options: Target Directory, Ignore Patterns, Flags
[group('ctxt')]
admd:
    #!/usr/bin/env zsh
    set -euo pipefail
    SUBDIR=$(find . -mindepth 1 -maxdepth 3 -type d -not -path '*/node_modules*' -not -path '*/.git*' | fzf --prompt="📁 Target Directory > ")
    [[ -z "$SUBDIR" ]] && exit 0
    ADMD_MENU="None (Default)\nCustom Ignore (Type patterns)\n--flat (Top-level files only)\n-i \"*.png\" \"*.jpg\" \"*.svg\" (Ignore images)\n-i dist build coverage (Ignore build dirs)"
    SELECTED_OPTS=$(echo -e "$ADMD_MENU" | fzf --prompt="⚙️ admd options > ")
    [[ -z "$SELECTED_OPTS" ]] && exit 0
    if [[ "$SELECTED_OPTS" == "None"* ]]; then
        FLAGS=""
    elif [[ "$SELECTED_OPTS" == "Custom Ignore"* ]]; then
        echo ""
        read "?🛑 Enter ignore patterns (use quotes for globs): " CUSTOM_PATTERN
        [[ -z "$CUSTOM_PATTERN" ]] && exit 0
        FLAGS="-i $CUSTOM_PATTERN"
    else
        FLAGS=$(echo "$SELECTED_OPTS" | sed 's/ (.*//')
    fi
    echo "\n🚀 Running admd in $SUBDIR..."
    cd "$SUBDIR"
    admd . -i node_modules .git dist ${=FLAGS}

