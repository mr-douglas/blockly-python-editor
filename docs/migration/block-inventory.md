# Legacy block and application inventory

This document records the behavior that must remain available while migrating
the original Blockly 5 application to the standalone Blockly 13 application.
It is based on the source at `mr-douglas/blockly` commit `0ef4104a`.

## Compatibility rules

- Preserve existing block type IDs, field names, input names, mutations, and
  typed-variable names so existing `.blockly` XML files can still be loaded.
- New blocks should use an application-specific prefix. The unprefixed legacy
  IDs below remain supported as compatibility IDs.
- Custom blocks and generators belong to feature modules in this application;
  Blockly core is never edited.
- Generated bundles and source maps are build artifacts and are not committed.
- Empty value inputs on statement blocks still show their Python, but every
  emitted line begins with `#`. Expression blocks are exempt.

## Supported application features

| Feature | Custom generator IDs | Notable behavior |
| --- | ---: | --- |
| Custom code | 2 | `import_user_library`; free-form `insert_user_code` |
| Data types | 3 | `float`, `int`, and `str` conversion blocks |
| Time | 2 | Sleep and current-time blocks |
| Turtle | 21 | Movement, turns, position, heading, pen/fill, colors, visibility, and fill wrapper |
| Tkinter/ttk | 42 | Typed windows/widgets, layout, configuration, callbacks, dialogs, delayed callbacks, and label images |
| Raspberry Pi / gpiozero | 63 | Typed device setup and operations for LEDs, inputs, sensors, buzzer, servo, rotary encoder, ultrasonic, motion, and PWM |
| Build HAT | 58 | Typed motors, sensors, lights, and matrices |
| EV3/Pybricks | 37 | Brick, motor, and sensor operations retained as legacy functionality |

These counts were checked directly against the original custom generator
files. Some families also contain helper/mutator definitions and dormant blocks
in addition to the user-facing blocks.

## Extensions to Blockly's standard categories

| Category | Custom block or behavior | Status |
| --- | --- | --- |
| Lists | `lists_append`, `lists_remove`, `lists_pop`, `lists_shuffle` | Supported |
| Logic | `controls_try_except_finally` | Supported |
| Logic | Display `logic_null` as “None/null” | Preserve through messages/configuration, not a copied core block |
| Math | `math_trig` with degree/radian selector | Supported compatibility override |
| Math | Separate `math_inv_trig` with degree/radian result selector | Supported |
| Math | `SQRT1_3` option on `math_constant` | Supported compatibility override |
| Text | `text_newline` | Supported |
| Text | Integer prompt option, trimmed prompt input, console-I/O marker | Supported compatibility behavior |
| Procedures | `procedures_get_name`, a callback reference rather than a call | Supported |
| Python generator | Comment incomplete statement blocks instead of silently filling required values | Supported application policy |

Standard variables, loops, and the rest of the standard list/logic/math/text/
procedure blocks should come directly from Blockly 13.

## Typed variable names

These strings are part of saved-workspace compatibility and must not be
silently renamed.

### Tkinter

- `GUI_Window`
- `GUI_Button`
- `GUI_Checkbutton`
- `GUI_Combobox`
- `GUI_Entry`
- `GUI_Label`
- `GUI_Progressbar`
- `GUI_Radiobutton`

### Raspberry Pi / gpiozero

- `RPi_LED`
- `RPi_RGB_LED`
- `RPi_Button`
- `RPi_Light_Sensor`
- `RPi_Buzzer`
- `RPi_Servo`
- `RPi_Rotary_Encoder`
- `RPi_USonic_Sensor`
- `RPi_Motion_Sensor`
- `RPi_Digital_Input`
- `RPi_Digital_Output`
- `RPi_PWM_Output`

### Build HAT

- `BHT_Motor`
- `BHT_Motor_Pair`
- `BHT_Color_Sensor`
- `BHT_Color_Distance_Sensor`
- `BHT_Distance_Sensor`
- `BHT_Force_Sensor`
- `BHT_Motion_Sensor`
- `BHT_Tilt_Sensor`
- `BHT_Light`
- `BHT_Matrix`

### EV3

- `EV3Motor`
- `EV3Sensor`

## Deliberately hidden or legacy features

- Build HAT motor-pair blocks remain implemented for old saved files, but are
  not shown in the toolbox. They were intentionally disabled in the original
  application.
- Tkinter Checkbutton, Radiobutton, and Progressbar types remain loadable, but
  their categories stay hidden as in the original application.
- EV3 remains an optional legacy feature. It is not part of the maintained
  feature set, but existing projects can continue to load it.

## Application shell to preserve

- A 75% Blockly workspace and 25% live Python code panel.
- Thrasos renderer, visible zoom controls, grid, trashcan, and saturated block
  colors.
- Copy generated Python, save `.py`, save/load `.blockly`, and a before-unload
  warning.
- Legacy XML loading and saving so existing `.blockly` files remain portable.
- Local Skulpt execution, console modal, and turtle canvas where the generated
  program is supported by Skulpt.
- Dynamic typed-variable flyouts and creation buttons.
- Tkinter child configuration blocks automatically prefill the widget variable
  from their parent block.

## Source changes that must not migrate

- Direct edits to Blockly core, build scripts, and generated bundles/maps.
- The old `goog.require`/Closure module pattern.
- The custom `core/procedures` flyout modification; use an application toolbox
  callback instead.
- The `core/field_variable` null guard; use current Blockly behavior and report
  an upstream defect if a modern reproduction exists.
- The global Blockly HSV constant edit; use an application-owned theme.
