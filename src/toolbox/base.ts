import * as Blockly from 'blockly';

const block = (type: string, extra: Record<string, unknown> = {}) =>
  ({kind: 'block', type, ...extra}) as Blockly.utils.toolbox.BlockInfo;

export const mathCategory = {
  kind: 'category', name: 'Maths', colour: String(Blockly.Msg.MATH_HUE ?? 230),
  contents: [
    {kind: 'category', name: 'Basics', contents: [block('math_number', {fields: {NUM: 0}}), block('math_arithmetic'), block('math_single'), block('math_constant')]},
    {kind: 'category', name: 'Random', contents: [block('math_random_int'), block('math_random_float')]},
    {kind: 'category', name: 'Trigonometry', contents: [block('math_trig'), block('math_inv_trig')]},
    {kind: 'category', name: 'Other', contents: [block('math_number_property'), block('math_round'), block('math_on_list'), block('math_modulo'), block('math_constrain')]},
  ],
} as Blockly.utils.toolbox.StaticCategoryInfo;

export const ioCategory = {kind: 'category', name: 'Input/Output', colour: String(Blockly.Msg.TEXTS_HUE ?? 160), contents: [block('text_print'), block('text_prompt_ext')]} as Blockly.utils.toolbox.StaticCategoryInfo;
export const stringsCategory = {
  kind: 'category', name: 'Strings (Text)', colour: String(Blockly.Msg.TEXTS_HUE ?? 160),
  contents: ['text', 'text_join', 'text_append', 'text_length', 'text_isEmpty', 'text_indexOf', 'text_charAt', 'text_getSubstring', 'text_changeCase', 'text_trim', 'text_reverse', 'text_newline'].map((type) => block(type)),
} as Blockly.utils.toolbox.StaticCategoryInfo;
export const logicCategory = {
  kind: 'category', name: 'Selection (If/Else) and Logic', colour: String(Blockly.Msg.LOGIC_HUE ?? 210),
  contents: [block('controls_if'), block('logic_compare'), block('logic_operation'), block('logic_negate'), block('logic_boolean'), block('logic_null'), {kind: 'label', text: 'Handling errors'}, block('controls_try_except_finally')],
} as Blockly.utils.toolbox.StaticCategoryInfo;
export const loopsCategory = {
  kind: 'category', name: 'Iteration (Loops)', colour: String(Blockly.Msg.LOOPS_HUE ?? 120),
  contents: ['controls_repeat_ext', 'controls_whileUntil', 'controls_for', 'controls_forEach', 'controls_flow_statements'].map((type) => block(type)),
} as Blockly.utils.toolbox.StaticCategoryInfo;
export const variablesCategory = {kind: 'category', name: 'Variables', colour: String(Blockly.Msg.VARIABLES_HUE ?? 330), custom: 'VARIABLE'} as unknown as Blockly.utils.toolbox.DynamicCategoryInfo;
export const proceduresCategory = {kind: 'category', name: 'Functions', colour: String(Blockly.Msg.PROCEDURES_HUE ?? 290), custom: 'PROCEDURE_WITH_REFERENCE'} as unknown as Blockly.utils.toolbox.DynamicCategoryInfo;
export {block};
