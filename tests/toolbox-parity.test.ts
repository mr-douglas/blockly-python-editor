// @vitest-environment jsdom

import * as Blockly from 'blockly';
import {beforeAll, describe, expect, it} from 'vitest';

import {features} from '../src/features';
import {educationalEnglish} from '../src/i18n/educational-en';
import {toolbox} from '../src/toolbox';

type Item = Blockly.utils.toolbox.ToolboxItemInfo & {
  name?: string;
  type?: string;
  fields?: Record<string, unknown>;
  inputs?: Record<string, unknown>;
  contents?: Item[];
};

const root = (toolbox as Blockly.utils.toolbox.ToolboxInfo).contents as Item[];
const categories = root.filter((item) => item.kind === 'category');

function namedCategory(name: string, parent = categories): Item {
  const category = parent.find((item) => item.name === name);
  if (!category) throw new Error(`Missing category ${name}`);
  return category;
}

function blocks(category: Item): Item[] {
  return (category.contents ?? []).filter((item) => item.kind === 'block');
}

beforeAll(() => {
  Blockly.setLocale(educationalEnglish);
  features.forEach((feature) => feature.registerBlocks());
});

describe('educational toolbox parity', () => {
  it('keeps the original category order and nesting', () => {
    expect(root.map((item) => item.kind === 'sep' ? 'sep' : item.name)).toEqual([
      'Maths',
      'Input/Output',
      'Time',
      'Strings (Text)',
      'sep',
      'Selection (If/Else) and Logic',
      'Iteration (Loops)',
      'Data Types',
      'sep',
      'Lists',
      'Variables',
      'Functions',
      'sep',
      'Turtle',
      'GUI',
      'EV3',
      'BuildHAT',
      'Raspberry Pi',
      'sep',
      'Insert Your Own Code',
    ]);

    expect(namedCategory('Maths').contents?.map((item) => item.name)).toEqual([
      'Basics',
      'Random',
      'Trigonometry',
      'Other',
    ]);
    expect(namedCategory('GUI').contents?.map((item) => item.name)).toEqual([
      'Window',
      'Label',
      'Button',
      'Entry',
      'Message Boxes',
      'Combo Box',
    ]);
  });

  it('keeps distinct arithmetic and trigonometry starter blocks', () => {
    const maths = namedCategory('Maths');
    const basics = blocks(namedCategory('Basics', maths.contents));
    const arithmetic = basics.filter((item) => item.type === 'math_arithmetic');
    expect(arithmetic.map((item) => item.fields?.OP)).toEqual([
      'ADD',
      'MINUS',
      'MULTIPLY',
      'DIVIDE',
      'POWER',
    ]);
    expect(
      arithmetic.map((item) =>
        (item.inputs?.A as any).shadow.fields.NUM,
      ),
    ).toEqual([0, 0, 1, 1, 1]);

    const trig = blocks(namedCategory('Trigonometry', maths.contents));
    expect(trig.map((item) => `${item.type}:${item.fields?.OP}`)).toEqual([
      'math_trig:SIN',
      'math_trig:COS',
      'math_trig:TAN',
      'math_inv_trig:ASIN',
      'math_inv_trig:ACOS',
      'math_inv_trig:ATAN',
    ]);
    expect((trig[0].inputs?.NUM as any).shadow.fields.NUM).toBe(45);
    expect((trig[3].inputs?.NUM as any).shadow.fields.CONSTANT).toBe(
      'SQRT1_2',
    );
  });

  it('keeps the two list constructors and all list starter values', () => {
    const listBlocks = blocks(namedCategory('Lists'));
    expect(listBlocks.slice(0, 2).map((item) => item.type)).toEqual([
      'lists_create_with',
      'lists_create_with',
    ]);
    expect((listBlocks[0] as any).extraState.itemCount).toBe(0);
    const repeat = listBlocks.find((item) => item.type === 'lists_repeat')!;
    expect((repeat.inputs?.NUM as any).shadow.fields.NUM).toBe(5);
    const append = listBlocks.find((item) => item.type === 'lists_append')!;
    expect((append.inputs?.ITEM as any).shadow.fields.TEXT).toBe('item');
    expect((append.inputs?.LIST as any).block.fields.VAR.name).toBe('list');
  });

  it('restores the colour blocks and starter values to Turtle', () => {
    const turtle = blocks(namedCategory('Turtle'));
    expect(turtle.slice(-4).map((item) => item.type)).toEqual([
      'colour_picker',
      'colour_random',
      'colour_rgb',
      'colour_blend',
    ]);
    const world = turtle.find(
      (item) => item.type === 'turtle_setworldcoordinates',
    )!;
    expect(
      ['X_MIN', 'Y_MIN', 'X_MAX', 'Y_MAX'].map(
        (name) => (world.inputs?.[name] as any).shadow.fields.NUM,
      ),
    ).toEqual([-200, -200, 200, 200]);
  });
});

describe('educational wording parity', () => {
  it('uses the original Python-oriented null and prompt language', () => {
    const workspace = new Blockly.Workspace();
    const nullBlock = workspace.newBlock('logic_null');
    const prompt = workspace.newBlock('text_prompt_ext');
    const dropdown = prompt.getField('TYPE') as Blockly.FieldDropdown;

    expect(nullBlock.toString()).toContain('None/null');
    // FieldDropdown factors the shared prefix/suffix out of the menu and
    // renders them around the dropdown. Assert both the visible sentence and
    // the three learner-facing choices.
    expect(prompt.toString()).toContain('get text input from user with message');
    expect(dropdown.getOptions(false).map(([label]) => label)).toEqual([
      'text',
      'number',
      'integer',
    ]);
    workspace.dispose();
  });
});
