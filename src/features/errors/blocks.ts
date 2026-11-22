import * as Blockly from 'blockly';

export function registerBlocks(): void {
  Blockly.common.defineBlocksWithJsonArray([
    {
      type: 'controls_try_except_finally',
      message0: 'try',
      message1: '%1',
      args1: [{type: 'input_statement', name: 'TRY'}],
      message2: 'if something goes wrong',
      message3: '%1',
      args3: [{type: 'input_statement', name: 'EXCEPT'}],
      message4: 'always do this at the end',
      message5: '%1',
      args5: [{type: 'input_statement', name: 'FINALLY'}],
      previousStatement: null,
      nextStatement: null,
      style: 'logic_blocks',
      tooltip:
        'Try some instructions, handle errors, and then always run the final instructions.',
      helpUrl:
        'https://docs.python.org/3/tutorial/errors.html#handling-exceptions',
    },
  ]);
}
