import * as Blockly from 'blockly';

const blocks: Blockly.JsonBlockDefinition[] = [
  {
    type: 'lists_shuffle',
    message0: 'shuffle %1',
    args0: [{type: 'input_value', name: 'LIST', check: 'Array'}],
    previousStatement: null,
    nextStatement: null,
    style: 'list_blocks',
    tooltip: 'Shuffle a list in place',
    helpUrl: 'https://docs.python.org/3/library/random.html#random.shuffle',
  },
  {
    type: 'lists_append',
    message0: 'append %1 to %2',
    args0: [
      {type: 'input_value', name: 'ITEM'},
      {type: 'input_value', name: 'LIST', check: 'Array'},
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'list_blocks',
    tooltip: 'Append an item to the end of a list.',
    helpUrl: '',
  },
  {
    type: 'lists_remove',
    message0: 'remove %1 from %2',
    args0: [
      {type: 'input_value', name: 'ITEM'},
      {type: 'input_value', name: 'LIST', check: 'Array'},
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'list_blocks',
    tooltip: 'Remove the first occurrence of an item from a list.',
    helpUrl: '',
  },
  {
    type: 'lists_pop',
    message0: 'in list %1 remove element at position %2',
    args0: [
      {type: 'input_value', name: 'LIST', check: 'Array'},
      {type: 'input_value', name: 'AT', check: 'Number'},
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'list_blocks',
    tooltip:
      'Remove and return the item at the given index (or last if omitted).',
    helpUrl: '',
  },
];

export function registerBlocks(): void {
  Blockly.common.defineBlocksWithJsonArray(blocks);
}
