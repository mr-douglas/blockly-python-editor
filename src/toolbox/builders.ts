import type * as Blockly from 'blockly';

type BlockOptions = Omit<Blockly.utils.toolbox.BlockInfo, 'kind' | 'type'>;

/**
 * Small, typed builders for the educational toolbox presentation layer.
 *
 * A repeated toolbox entry is a preset of one maintained block type, not a
 * duplicate block implementation.  Keeping the defaults here lets Blockly be
 * upgraded without losing the teaching-oriented palette.
 */
export function block(
  type: string,
  options: BlockOptions = {},
): Blockly.utils.toolbox.BlockInfo {
  return {kind: 'block', type, ...options};
}

export function shadow(
  type: string,
  options: BlockOptions = {},
): {shadow: Blockly.serialization.blocks.State} {
  return {shadow: {type, ...options}};
}

export const numberShadow = (value: number) =>
  shadow('math_number', {fields: {NUM: value}});

export const textShadow = (value = '') =>
  shadow('text', {fields: {TEXT: value}});

export const booleanShadow = (value: boolean) =>
  shadow('logic_boolean', {fields: {BOOL: value ? 'TRUE' : 'FALSE'}});

export const colourShadow = (value: string) =>
  shadow('colour_picker', {fields: {COLOUR: value}});

export function variableBlock(name: string, variableType = '') {
  return {
    block: {
      type: 'variables_get',
      fields: {VAR: {name, type: variableType}},
    },
  };
}

export const category = (
  name: string,
  colour: string,
  contents: Blockly.utils.toolbox.ToolboxItemInfo[],
): Blockly.utils.toolbox.StaticCategoryInfo =>
  ({kind: 'category', name, colour, contents}) as
    Blockly.utils.toolbox.StaticCategoryInfo;
