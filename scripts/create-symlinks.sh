#!/bin/bash

paths=(
  "content/articles/2012-07-16-using-kbd-for-fun-and-profit/_post-kbd.css:public/post-kbd.css"
  "src/components/ThemeSwitch/theme.cjs:public/theme.js"
)

# Initialize a counter for created symlinks
symlink_count=0

# Iterate over the array and create symlinks
for path_pair in "${paths[@]}"; do
  IFS=":" read -r source target <<< "$path_pair"

  # Check if the target symlink file or directory already exists
  if [ -e "$PWD/$target" ]; then
    continue
  fi

  # Create the symlink if it doesn't exist
  ln -s "$PWD/$source" "$PWD/$target"
  symlink_count=$((symlink_count + 1))
done

echo "✔️ [create-symlinks] Created $symlink_count symlinks."
