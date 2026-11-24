import * as Blockly from 'blockly';
import {block, category, numberShadow, shadow} from '../builders';

const arithmetic = (operation: string, defaultValue: number) =>
  block('math_arithmetic', {
    fields: {OP: operation},
    inputs: {
      A: numberShadow(defaultValue),
      B: numberShadow(defaultValue),
    },
  });

const directTrig = (operation: string) =>
  block('math_trig', {
    fields: {OP: operation},
    inputs: {NUM: numberShadow(45)},
  });

const inverseTrig = (operation: string) =>
  block('math_inv_trig', {
    fields: {OP: operation},
    inputs: {
      NUM:
        operation === 'ATAN'
          ? numberShadow(1)
          : shadow('math_constant', {fields: {CONSTANT: 'SQRT1_2'}}),
    },
  });

const colour = String(Blockly.Msg.MATH_HUE ?? 230);

export const mathCategory = category('Maths', colour, [
  category('Basics', colour, [
    block('math_number', {fields: {NUM: 0}}),
    arithmetic('ADD', 0),
    arithmetic('MINUS', 0),
    arithmetic('MULTIPLY', 1),
    arithmetic('DIVIDE', 1),
    arithmetic('POWER', 1),
    block('math_single', {inputs: {NUM: numberShadow(0)}}),
    block('math_constant'),
  ]),
  category('Random', colour, [
    block('math_random_int', {
      inputs: {FROM: numberShadow(1), TO: numberShadow(100)},
    }),
    block('math_random_float'),
  ]),
  category('Trigonometry', colour, [
    directTrig('SIN'),
    directTrig('COS'),
    directTrig('TAN'),
    inverseTrig('ASIN'),
    inverseTrig('ACOS'),
    inverseTrig('ATAN'),
  ]),
  category('Other', colour, [
    block('math_number_property', {
      inputs: {NUMBER_TO_CHECK: numberShadow(0)},
    }),
    block('math_round', {inputs: {NUM: numberShadow(3.1)}}),
    block('math_on_list'),
    block('math_modulo', {
      inputs: {DIVIDEND: numberShadow(64), DIVISOR: numberShadow(10)},
    }),
    block('math_constrain', {
      inputs: {
        VALUE: numberShadow(50),
        LOW: numberShadow(1),
        HIGH: numberShadow(100),
      },
    }),
  ]),
]);
