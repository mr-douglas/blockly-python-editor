# Blockly upstream

This application consumes the official Raspberry Pi Foundation release of
Blockly from npm. It does not modify or vendor Blockly core.

- Repository: <https://github.com/RaspberryPiFoundation/blockly>
- Package: `blockly`
- Pinned version: `13.5.0`
- Release tag: `blockly-v13.5.0`

Update Blockly through a normal dependency pull request, then run the type,
generator, legacy-workspace, and browser tests. Version-specific compatibility
code belongs only in `src/blockly-compat/`.
