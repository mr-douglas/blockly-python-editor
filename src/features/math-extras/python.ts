import type * as Blockly from 'blockly';
import type {PythonGenerator} from 'blockly/python';

export function registerPython(generator: PythonGenerator): void {
  const python = generator as any;

  const trigGenerator = (block: Blockly.Block): [string, number] => {
    python.definitions_['import_math'] = 'import math';
    const argument =
      generator.valueToCode(block, 'NUM', python.ORDER_NONE) || '0';
    const operation = block.getFieldValue('OP');
    const degrees = block.getFieldValue('ANGLE_MEASURE') === 'DEGREES';
    const functionName = operation.toLowerCase();
    const direct = operation === 'SIN' || operation === 'COS' || operation === 'TAN';
    const input = direct && degrees ? `math.radians(${argument})` : argument;
    let code = `math.${functionName}(${input})`;
    if (!direct && degrees) code = `math.degrees(${code})`;
    return [code, python.ORDER_FUNCTION_CALL] as [string, number];
  };
  generator.forBlock['math_trig'] = trigGenerator;
  generator.forBlock['math_inv_trig'] = trigGenerator;

  generator.forBlock['math_constant'] = (block: Blockly.Block) => {
    const values: Record<string, [string, number]> = {
      PI: ['math.pi', python.ORDER_MEMBER],
      E: ['math.e', python.ORDER_MEMBER],
      GOLDEN_RATIO: [
        '(1 + math.sqrt(5)) / 2',
        python.ORDER_MULTIPLICATIVE,
      ],
      SQRT2: ['math.sqrt(2)', python.ORDER_MEMBER],
      SQRT1_2: ['math.sqrt(1.0 / 2)', python.ORDER_MEMBER],
      SQRT1_3: ['math.sqrt(1.0 / 3)', python.ORDER_MEMBER],
      INFINITY: ["float('inf')", python.ORDER_ATOMIC],
    };
    const name = block.getFieldValue('CONSTANT');
    if (name !== 'INFINITY') python.definitions_['import_math'] = 'import math';
    return values[name];
  };
}
