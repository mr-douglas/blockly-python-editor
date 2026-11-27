# Changelog

## Unreleased

- Buttons use the same Font Awesome icons as the original editor.
- Blocks use the original editor's vibrant colours (HSV saturation 0.9,
  value 0.7) instead of Blockly's paler defaults.
- The page now uses the original editor's layout and `style.css`: the same
  round buttons (size, colours, positions, hover labels), Python panel,
  "Copied!" alert and run window, so it looks like
  https://mr-douglas.github.io/blockly/.

## 0.1.0 - 2026-11-22

- Rebuilt the editor as a standalone TypeScript application on Blockly 13.5.0.
- Migrated the original custom Python, Turtle, Tkinter, gpiozero, Build HAT,
  and legacy EV3 block families into independent feature modules.
- Preserved legacy `.blockly` XML IDs and typed-variable names.
- Added dependency-update CI and GitHub Pages deployment.
