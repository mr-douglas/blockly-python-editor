import * as Blockly from 'blockly';
import {
  PythonGenerator,
  pythonGenerator as upstreamPythonGenerator,
} from 'blockly/python';

const optionalValueInputs: Readonly<Record<string, ReadonlySet<string>>> = {
  lists_pop: new Set(['AT']),
};

/**
 * Python generator with the editor's child-friendly incomplete-block policy.
 *
 * Statement blocks always show the code they represent. If an editable text
 * field or value socket is empty, every generated line is commented out so the
 * overall program remains valid. Expression blocks are intentionally exempt.
 */
export class EducationalPythonGenerator extends PythonGenerator {
  constructor() {
    super('Python');
    Object.assign(this.forBlock, upstreamPythonGenerator.forBlock);
  }

  override scrub_(
    block: Blockly.Block,
    code: string,
    thisOnly = false,
  ): string {
    if (block.previousConnection && this.hasMissingElement(block)) {
      code = code.trim()
        ? code.replace(/^#+/gm, '').replace(/^(?=.)/gm, '#')
        : '#\n';
    }
    return super.scrub_(block, code, thisOnly);
  }

  private hasMissingElement(block: Blockly.Block): boolean {
    return block.inputList.some((input) => {
      if (
        input.type === Blockly.inputs.inputTypes.VALUE &&
        input.connection &&
        !input.connection.targetConnection &&
        !optionalValueInputs[block.type]?.has(input.name)
      ) {
        return true;
      }
      return input.fieldRow.some(
        (field) =>
          field instanceof Blockly.FieldTextInput &&
          !String(field.getValue() ?? '').trim(),
      );
    });
  }
}

export const pythonGenerator = new EducationalPythonGenerator();
