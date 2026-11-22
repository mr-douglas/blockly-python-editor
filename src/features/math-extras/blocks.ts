import * as Blockly from 'blockly';

const directTrig = {
  type: 'math_trig',
  message0: '%1 ( %2 %3 )',
  args0: [
    {
      type: 'field_dropdown',
      name: 'OP',
      options: [
        ['%{BKY_MATH_TRIG_SIN}', 'SIN'],
        ['%{BKY_MATH_TRIG_COS}', 'COS'],
        ['%{BKY_MATH_TRIG_TAN}', 'TAN'],
      ],
    },
    {type: 'input_value', name: 'NUM', check: 'Number'},
    {
      type: 'field_dropdown',
      name: 'ANGLE_MEASURE',
      options: [
        ['°', 'DEGREES'],
        ['radians', 'RADIANS'],
      ],
    },
  ],
  output: 'Number',
  style: 'math_blocks',
  helpUrl: '%{BKY_MATH_TRIG_HELPURL}',
};

const inverseTrig = {
  type: 'math_inv_trig',
  message0: '%1 ( %2 ) in %3',
  args0: [
    {
      type: 'field_dropdown',
      name: 'OP',
      options: [
        ['%{BKY_MATH_TRIG_ASIN}', 'ASIN'],
        ['%{BKY_MATH_TRIG_ACOS}', 'ACOS'],
        ['%{BKY_MATH_TRIG_ATAN}', 'ATAN'],
      ],
    },
    {type: 'input_value', name: 'NUM', check: 'Number'},
    {
      type: 'field_dropdown',
      name: 'ANGLE_MEASURE',
      options: [
        ['°', 'DEGREES'],
        ['radians', 'RADIANS'],
      ],
    },
  ],
  output: 'Number',
  style: 'math_blocks',
  helpUrl: '%{BKY_MATH_TRIG_HELPURL}',
};

const constants = {
  type: 'math_constant',
  message0: '%1',
  args0: [
    {
      type: 'field_dropdown',
      name: 'CONSTANT',
      options: [
        ['π', 'PI'],
        ['e', 'E'],
        ['φ', 'GOLDEN_RATIO'],
        ['sqrt(2)', 'SQRT2'],
        ['sqrt(½)', 'SQRT1_2'],
        ['sqrt(⅓)', 'SQRT1_3'],
        ['∞', 'INFINITY'],
      ],
    },
  ],
  output: 'Number',
  style: 'math_blocks',
  tooltip: '%{BKY_MATH_CONSTANT_TOOLTIP}',
  helpUrl: '%{BKY_MATH_CONSTANT_HELPURL}',
};

function overrideJsonBlock(type: string, definition: object): void {
  Blockly.Blocks[type] = {
    init() {
      this.jsonInit(definition);
    },
  };
}

/** Applies only the three deliberate differences from standard math blocks. */
export function registerBlocks(): void {
  overrideJsonBlock('math_trig', directTrig);
  overrideJsonBlock('math_inv_trig', inverseTrig);
  overrideJsonBlock('math_constant', constants);
}
