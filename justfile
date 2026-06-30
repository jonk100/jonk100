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
[group('project')]
dev:
    pnpm dev --open