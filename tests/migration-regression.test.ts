// @vitest-environment jsdom

import * as Blockly from 'blockly';
import {beforeAll, describe, expect, it} from 'vitest';

import {features} from '../src/features';
import {EducationalPythonGenerator} from '../src/generator/educational-python-generator';
import {educationalEnglish} from '../src/i18n/educational-en';

let generator: EducationalPythonGenerator;

function makeWorkspace(): Blockly.Workspace {
  return new Blockly.Workspace();
}

function attachValue(
  parent: Blockly.Block,
  inputName: string,
  child: Blockly.Block,
): void {
  parent.getInput(inputName)?.connection?.connect(child.outputConnection!);
}

beforeAll(() => {
  Blockly.setLocale(educationalEnglish);
  generator = new EducationalPythonGenerator();
  for (const feature of features) {
    feature.registerBlocks();
    feature.registerPython(generator);
  }
});

describe('modular feature registration', () => {
  it('composes each migrated feature exactly once', () => {
    const ids = features.map((feature) => feature.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual([
      'math-extras',
      'text-extras',
      'collections',
      'errors',
      'procedure-reference',
      'data-types',
      'time',
      'colour',
      'turtle',
      'tkinter',
      'legacy-ev3',
      'buildhat',
      'gpiozero',
      'custom-code',
    ]);
    expect(Object.keys(generator.forBlock)).toHaveLength(305);
  });

  it.each([
    'math_inv_trig',
    'text_newline',
    'lists_shuffle',
    'controls_try_except_finally',
    'procedures_get_name',
    'float',
    'time_sleep',
    'colour_picker',
    'colour_random',
    'colour_rgb',
    'colour_blend',
    'turtle_move',
    'tkinter_window_after',
    'tkinter_set_label_image',
    'tkinter_set_label_image_pillow',
    'ev3_beep',
    'bht_new_motor',
    'rpi_new_led',
    'import_user_library',
    'insert_user_code',
  ])('registers the %s block and Python generator', (type) => {
    expect(Blockly.Blocks[type]).toBeDefined();
    expect(generator.forBlock[type]).toBeTypeOf('function');
  });
});

describe('representative Python generation', () => {
  it('places user imports at the start of the program', () => {
    const workspace = makeWorkspace();
    const importBlock = workspace.newBlock('import_user_library');
    importBlock.setFieldValue('statistics', 'LIBRARY');
    const printBlock = workspace.newBlock('text_print');
    attachValue(printBlock, 'TEXT', workspace.newBlock('text_newline'));
    importBlock.nextConnection?.connect(printBlock.previousConnection!);

    const code = generator.workspaceToCode(workspace);
    expect(code).toMatch(/^import statistics\n/);
    expect(code.indexOf('import statistics')).toBeLessThan(
      code.indexOf("print('\\n')"),
    );
    expect(code).toContain('#This program uses console I/O');
    expect(code).toContain("print('\\n')");
    workspace.dispose();
  });

  it('generates random.shuffle for a connected list', () => {
    const workspace = makeWorkspace();
    const shuffle = workspace.newBlock('lists_shuffle');
    attachValue(shuffle, 'LIST', workspace.newBlock('lists_create_with'));

    const code = generator.workspaceToCode(workspace);
    expect(code).toContain('import random');
    expect(code).toContain('random.shuffle([None, None, None])');
    workspace.dispose();
  });

  it('generates all three try/except/finally suites', () => {
    const workspace = makeWorkspace();
    workspace.newBlock('controls_try_except_finally');

    expect(generator.workspaceToCode(workspace)).toContain(
      'try:\n  pass\nexcept Exception:\n  pass\nfinally:\n  pass',
    );
    workspace.dispose();
  });
});

describe('educational incomplete-statement policy', () => {
  it('keeps an empty import visible as commented Python', () => {
    const workspace = makeWorkspace();
    const block = workspace.newBlock('import_user_library');
    block.setFieldValue('', 'LIBRARY');

    expect(generator.workspaceToCode(workspace).trim()).toBe('#import');
    workspace.dispose();
  });

  it('does not comment an intentionally blank optional list-pop position', () => {
    const workspace = makeWorkspace();
    const pop = workspace.newBlock('lists_pop');
    attachValue(pop, 'LIST', workspace.newBlock('lists_create_with'));

    const code = generator.workspaceToCode(workspace);
    expect(code).toContain('[None, None, None].pop()');
    expect(code).not.toContain('#[None, None, None].pop()');
    workspace.dispose();
  });

  it('comments a generated statement when a required value is missing', () => {
    const workspace = makeWorkspace();
    workspace.newBlock('tkinter_set_window_as_root');

    const code = generator.workspaceToCode(workspace);
    expect(code).toContain('# = tkinter.Tk()');
    expect(code).not.toMatch(/^ = tkinter\.Tk\(\)$/m);
    workspace.dispose();
  });

  it('comments every line of an incomplete multi-line statement', () => {
    const workspace = makeWorkspace();
    const image = workspace.newBlock('tkinter_set_label_image');
    attachValue(image, 'FILE', workspace.newBlock('text'));

    const code = generator.workspaceToCode(workspace);
    expect(code).toContain('#.image = tkinter.PhotoImage');
    expect(code).toContain('#.config(image=.image)');
    workspace.dispose();
  });

  it('does not comment expression blocks with an empty socket', () => {
    const workspace = makeWorkspace();
    const expression = workspace.newBlock('int');

    expect(generator.workspaceToCode(workspace)).toContain('int()');
    expect(generator.workspaceToCode(workspace)).not.toContain('#int()');
    workspace.dispose();
  });
});

describe('legacy project compatibility', () => {
  it('loads legacy XML block IDs and fields', () => {
    const workspace = makeWorkspace();
    const xml = Blockly.utils.xml.textToDom(`
      <xml xmlns="https://developers.google.com/blockly/xml">
        <block type="import_user_library" x="10" y="10">
          <field name="LIBRARY">fractions</field>
          <next>
            <block type="tkinter_window_after">
              <value name="TIME">
                <shadow type="math_number"><field name="NUM">2</field></shadow>
              </value>
            </block>
          </next>
        </block>
      </xml>
    `);

    Blockly.Xml.domToWorkspace(xml, workspace);

    expect(workspace.getAllBlocks(false).map((block) => block.type)).toEqual(
      expect.arrayContaining([
        'import_user_library',
        'tkinter_window_after',
        'math_number',
      ]),
    );
    expect(generator.workspaceToCode(workspace)).toContain('import fractions');
    workspace.dispose();
  });

  it('removes a procedure reference when its definition is deleted', () => {
    const workspace = makeWorkspace();
    const definition = workspace.newBlock('procedures_defnoreturn');
    definition.setFieldValue('callback', 'NAME');
    const reference = workspace.newBlock('procedures_get_name');
    reference.setFieldValue('callback', 'NAME');
    (reference as any).onchange({type: Blockly.Events.BLOCK_CREATE});

    definition.dispose();
    (reference as any).onchange({type: Blockly.Events.BLOCK_DELETE});

    expect(workspace.getBlockById(reference.id)).toBeNull();
    workspace.dispose();
  });

  it('keeps a newly selected procedure reference', () => {
    const workspace = makeWorkspace();
    const firstDefinition = workspace.newBlock('procedures_defnoreturn');
    firstDefinition.setFieldValue('first', 'NAME');
    const secondDefinition = workspace.newBlock('procedures_defnoreturn');
    secondDefinition.setFieldValue('second', 'NAME');
    const reference = workspace.newBlock('procedures_get_name');

    (reference as any).onchange({type: Blockly.Events.BLOCK_CREATE});
    expect(reference.getFieldValue('NAME')).toBe('first');

    reference.setFieldValue('second', 'NAME');
    (reference as any).onchange({
      type: Blockly.Events.BLOCK_CHANGE,
      blockId: reference.id,
      element: 'field',
      name: 'NAME',
      oldValue: 'first',
      newValue: 'second',
    });

    expect(reference.getFieldValue('NAME')).toBe('second');
    expect((reference as any).procedureId_).toBe(secondDefinition.id);
    workspace.dispose();
  });
});
