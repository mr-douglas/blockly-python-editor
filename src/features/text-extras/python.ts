import type * as Blockly from 'blockly';
import type {PythonGenerator} from 'blockly/python';

export function registerPython(generator: PythonGenerator): void {
  const python = generator as any;

  generator.forBlock['text_newline'] = () => [
    "'\\n'",
    python.ORDER_ATOMIC,
  ];

  generator.forBlock['text_print'] = (block: Blockly.Block) => {
    python.definitions_['requires_console'] =
      '#This program uses console I/O';
    const message =
      generator.valueToCode(block, 'TEXT', python.ORDER_NONE) || "''";
    return `print(${message})\n`;
  };

  const promptGenerator = (block: Blockly.Block): [string, number] => {
    python.definitions_['requires_console'] =
      '#This program uses console I/O';
    const functionName = python.provideFunction_('text_prompt', [
      `def ${python.FUNCTION_NAME_PLACEHOLDER_}(msg):`,
      '  try:',
      '    return raw_input(msg).strip()',
      '  except NameError:',
      '    return input(msg).strip()',
    ]);
    const message =
      generator.valueToCode(block, 'TEXT', python.ORDER_NONE) || "''";
    let code = `${functionName}(${message})`;
    const type = block.getFieldValue('TYPE');
    if (type === 'NUMBER') code = `float(${code})`;
    if (type === 'INTEGER') code = `int(${code})`;
    return [code, python.ORDER_FUNCTION_CALL] as [string, number];
  };
  generator.forBlock['text_prompt_ext'] = promptGenerator;
}
