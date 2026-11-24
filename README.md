# Blockly Python Editor

A child-friendly visual Python editor built on the current official
[Raspberry Pi Foundation Blockly](https://github.com/RaspberryPiFoundation/blockly)
release.

The original editor was implemented by changing Blockly's own source. This
repository keeps Blockly as an exact npm dependency and implements every
editor-specific block as an application feature module. Updating Blockly is
therefore a dependency update rather than a source-code merge.

The deployed editor will be available at
<https://mr-douglas.github.io/blockly-python-editor/>.

## Included features

- The familiar 75/25 Blockly and live-Python layout, Thrasos renderer, file
  loading/saving, code copying, and supported in-browser execution.
- Python teaching extensions for imports, free-form code, types, time, lists,
  error handling, text, mathematics, callback references, and Turtle.
- Tkinter/ttk blocks, including delayed callbacks and native Tk/Pillow label
  images.
- Raspberry Pi gpiozero and Build HAT blocks.
- EV3/Pybricks blocks retained as clearly isolated legacy functionality.
- Compatibility with the original `.blockly` XML block IDs and typed-variable
  names.
- An educational generator policy that comments out incomplete statement code
  while still showing learners what the block represents.

Build HAT motor-pair blocks and the dormant Tkinter Checkbutton, Radiobutton,
and Progressbar families remain loadable from older files but are intentionally
not offered in the toolbox.

## Architecture

Each directory under `src/features/` owns one feature's block definitions,
Python generators, toolbox entries, and optional workspace callbacks. The
top-level feature registry composes them explicitly. Compatibility aliases for
the old Blockly APIs are confined to `src/blockly-compat/`; Blockly itself is
never patched.

The learner-facing palette is a separate presentation layer under
`src/toolbox/`. It records the original category order, wording, repeated
starter blocks, shadows, and default values without duplicating the underlying
block implementations. Dynamic GUI and hardware palettes share one typed
variable-category builder, so changing a preset does not require editing
Blockly or copying callback plumbing.

The application pins `blockly@13.5.0`. See [UPSTREAM.md](UPSTREAM.md) for the
upstream policy, [the block inventory](docs/migration/block-inventory.md) for
the compatibility contract, and [the comparison](docs/migration/upstream-comparison.md)
for differences between the old editor and current Blockly.

## Development

Requires Node.js 22 or newer.

```sh
npm ci
npm start
```

Before committing a change, run:

```sh
npm run typecheck
npm test
npm run build
```

`main` is deployed to GitHub Pages by `.github/workflows/pages.yml`.
Dependabot proposes Blockly and plugin updates; CI checks each update before it
is merged.

## Adding a feature

Add a self-contained module under `src/features/`, export a `FeatureModule`,
and add that module to `src/features/index.ts`. Prefer an application-prefixed
type ID for new blocks. Existing unprefixed IDs are kept only so old saved
workspaces remain compatible.

## License

Apache-2.0. Blockly and the Blockly plugins remain subject to their respective
upstream licenses.
