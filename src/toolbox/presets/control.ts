import * as Blockly from 'blockly';
import {block, booleanShadow, category, numberShadow} from '../builders';

export const logicCategory = category(
  'Selection (If/Else) and Logic',
  String(Blockly.Msg.LOGIC_HUE ?? 210),
  [
    block('controls_if'),
    block('logic_compare'),
    block('logic_operation'),
    block('logic_negate'),
    block('logic_boolean'),
    block('logic_null'),
    {kind: 'label', text: 'Handling errors'} as Blockly.utils.toolbox.LabelInfo,
    block('controls_try_except_finally'),
  ],
);

export const loopsCategory = category(
  'Iteration (Loops)',
  String(Blockly.Msg.LOOPS_HUE ?? 120),
  [
    block('controls_repeat_ext', {inputs: {TIMES: numberShadow(10)}}),
    block('controls_whileUntil', {inputs: {BOOL: booleanShadow(true)}}),
    block('controls_for', {
      inputs: {
        FROM: numberShadow(1),
        TO: numberShadow(10),
        BY: numberShadow(1),
      },
    }),
    block('controls_forEach'),
    block('controls_flow_statements'),
  ],
);
