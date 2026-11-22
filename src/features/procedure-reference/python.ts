import * as Blockly from 'blockly';
import type {PythonGenerator} from 'blockly/python';

export function registerPython(generator: PythonGenerator): void {
  const python = generator as any;
  generator.forBlock['procedures_get_name'] = (block: Blockly.Block) => {
    const name = python.nameDB_.getName(
      block.getFieldValue('NAME'),
      Blockly.PROCEDURE_CATEGORY_NAME,
    );
    return [name, python.ORDER_ATOMIC];
  };
}
