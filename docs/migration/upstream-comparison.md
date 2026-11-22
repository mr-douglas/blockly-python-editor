# Comparison with Raspberry Pi Foundation Blockly 13.5

## Base selection

The new application depends on the stable `blockly@13.5.0` release from
`RaspberryPiFoundation/blockly`. The Raspberry Pi Foundation repository is the
current official Blockly repository (the former `google/blockly` location now
resolves to it), not a separate downstream variant.

A standalone application is preferable to a source fork:

- Blockly releases can be upgraded as a normal dependency.
- Custom blocks and UI code no longer conflict with upstream source changes.
- The application can pin a known release while CI tests proposed upgrades.
- Upstream TypeScript, serialization, accessibility, and generator fixes are
  inherited instead of being reimplemented.

## Decision summary

| Area | Blockly 13.5 | Original application | Migration decision |
| --- | --- | --- | --- |
| Standard blocks | Current maintained implementations | Copied and edited Blockly 5 source | Use upstream directly |
| Custom blocks | Not present | App-specific Python, GUI, and hardware blocks | Retain in feature modules |
| Toolbox | JSON and callback APIs | One large XML string plus repeated callbacks | Compose typed per-feature fragments |
| Python generator | Modern `forBlock` API | Functions attached to global `Blockly.Python` | Register app generators through `forBlock` |
| Incomplete statements | Upstream supplies safe fallback expressions | Comment the represented statement when a required input is empty | Keep in an app-owned generator subclass |
| Saved workspaces | Modern JSON plus supported XML APIs | XML `.blockly` files | Keep the visible XML save/load workflow for compatibility; use current supported XML APIs and preserve compatibility IDs |
| Generated bundles | Produced by package tooling | Checked into the source repository | Build only in CI/deployment |

## Lists

Blockly 13.5 already supplies creation, repeat, length, empty check, index,
get/remove-at-index, set/insert-at-index, sublist, sort, split, and reverse.
Those implementations are substantially newer and should not be copied from
the Blockly 5 fork.

The following original blocks do **not** have direct Blockly 13.5 equivalents:

| Original block | Python | Decision |
| --- | --- | --- |
| `lists_append` | `list.append(item)` | Retain; simpler for learners than configuring the generic insert block |
| `lists_remove` | `list.remove(item)` | Retain; upstream removal is index-based, not value-based |
| `lists_pop` | `list.pop(index)` or `list.pop()` | Retain for its direct Python correspondence |
| `lists_shuffle` | `random.shuffle(list)` | Retain; no upstream shuffle statement block |

These retain their IDs because saved XML may reference them.

## Logic and error handling

All standard logic and if/else blocks should use Blockly 13.5. The original
`logic_null` source differed only by displaying “None/null”; preserve that text
through the message/configuration layer rather than replacing the maintained
block definition.

`controls_try_except_finally` is custom-only. Retain its three statement inputs
and child-facing labels. Its Python remains:

```python
try:
  pass
except Exception:
  pass
finally:
  pass
```

## Math

Blockly 13.5 still uses one `math_trig` block containing direct and inverse
operations. Its Python generator treats direct inputs as degrees and inverse
outputs as degrees.

The original application intentionally differs:

- `math_trig` contains only `sin`, `cos`, and `tan`, with an explicit degrees
  or radians selector.
- `math_inv_trig` contains inverse operations, also with an explicit result
  unit selector.
- `math_constant` adds `sqrt(1/3)` as `SQRT1_3`.

These differences are visible and serialized, so retaining them requires small
compatibility overrides of `math_trig` and `math_constant`, plus the new
`math_inv_trig` block. All other math blocks and generators should remain
upstream implementations.

## Text and input

Blockly 13.5 already has the standard text blocks, including multiline text,
count, replace, and reverse. Use those implementations.

The original application adds:

- `text_newline`, which returns `'\n'`.
- An `INTEGER` option on the prompt block in addition to text and floating
  point number.
- `.strip()` on prompt input.
- A console-I/O marker used by the local runtime.

Retain `text_newline`. Implement the prompt differences as a narrow application
extension/generator override instead of copying the complete text module. The
runtime should eventually detect required capabilities from blocks or feature
metadata rather than parsing a generated-code comment, but the marker remains
for compatibility during migration.

## Procedures and callbacks

Blockly 13.5 procedure blocks include years of serialization, mutation, variable,
and accessibility fixes. Use them unchanged.

`procedures_get_name` is different from an upstream procedure call: it emits a
function reference with no parentheses so Tkinter can use it as a callback.
Retain only this block and its generator. Populate its dropdown through modern
procedure/workspace APIs and register it in the application procedure flyout.
Do not copy the old complete `procedures.js` file or its core flyout edits.

## Variables and loops

There are no intentional source differences from the Blockly 5 baseline in the
original variable or loop modules. Use Blockly 13.5 directly. The application’s
typed GUI/hardware variable categories are additional toolbox behavior, not a
reason to replace upstream variable blocks.

## Custom-only feature families

Blockly core has no direct equivalents for these original feature families, so
they remain app-owned modules:

- Python import and free-form code insertion
- Python type conversion
- Time
- Turtle
- Tkinter/ttk
- gpiozero / Raspberry Pi hardware
- Build HAT
- EV3/Pybricks (legacy, optional)

Where Blockly 13.5 has a similarly named generic block, the custom block is
retained only when its Python-specific teaching behavior is materially different.

## Modern upstream differences that affect migration

- Block and generator code is TypeScript and modular; generator handlers live
  in `generator.forBlock`.
- Workspace JSON serialization is Blockly's preferred format. This editor keeps
  XML for its visible `.blockly` save/load contract and uses the supported XML
  compatibility APIs.
- Modern block definitions include accessibility metadata and current mutation
  serialization. Copying old standard blocks would discard those improvements.
- Several old globals and Closure symbols have moved or disappeared. Any
  temporary aliases belong in one `blockly-compat` adapter, not in feature code.
- Field Angle and Field Colour are first-party plugins rather than assumed core
  globals.

## Upgrade policy

1. Pin the production Blockly dependency to an exact stable release.
2. Let Dependabot open dependency updates.
3. Run type checking, generator golden tests, legacy XML fixtures, and browser
   tests for every update.
4. Keep version-specific workarounds inside `src/blockly-compat/` and document
   why each exists.
5. Remove a workaround once the minimum supported Blockly release no longer
   needs it.

## Migration completeness audit

The original custom sources at commit `0ef4104a` were compared by serialized
block/generator ID with this application. The app-owned families have exact
generator parity:

| Family | Original | Migrated |
| --- | ---: | ---: |
| Build HAT | 58 | 58 |
| Custom code | 2 | 2 |
| Data types | 3 | 3 |
| EV3/Pybricks | 37 | 37 |
| Tkinter/ttk | 42 | 42 |
| gpiozero / Raspberry Pi | 63 | 63 |
| Time | 2 | 2 |
| Turtle | 21 | 21 |

The migrated feature registry contains 240 Python handlers in total. The 52
handlers present in the old source scan but deliberately not copied are current
Blockly standard handlers: controls (2), lists (12), logic (6), math (12),
procedures (5), and text (15). Blockly 13 supplies those maintained
implementations directly. The application then narrowly adds or overrides the
documented list, error-handling, callback-reference, text, and math teaching
behavior.

Build HAT motor pairs remain registered but toolbox-hidden, the dormant
Tkinter widget families remain loadable but toolbox-hidden, and EV3 remains in
the isolated legacy module. No app-owned serialized generator ID was dropped.
