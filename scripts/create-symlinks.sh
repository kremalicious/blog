#!/bin/bash

paths=(
  "content:src/content"
  "content/articles/2012-07-16-using-kbd-for-fun-and-profit/_post-kbd.css:public/post-kbd.css"
)

# Check if symlinks already exist
symlinks_exist=true

for path_pair in "${paths[@]}"; do
  IFS=":" read -r source target <<< "$path_pair"
  
  # Check if the target symlink file or directory already exists
  if [ -e "$PWD/$target" ]; then
    symlinks_exist=false
    break
  fi
done

# If symlinks exist, exit the script
if ! $symlinks_exist; then
  exit 0
fi

# Iterate over the array and create symlinks
for path_pair in "${paths[@]}"; do
  IFS=":" read -r source target <<< "$path_pair"
  ln -s "$PWD/$source" "$PWD/$target"
done

# Count the number of elements in the paths array
symlink_count=${#paths[@]}

echo "✔️ [create-symlinks] Created $symlink_count symlinks."