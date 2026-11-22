import * as Blockly from 'blockly';

const promptTypes: Blockly.MenuOption[] = [
  [Blockly.Msg['TEXT_PROMPT_TYPE_TEXT'] || 'text', 'TEXT'],
  [Blockly.Msg['TEXT_PROMPT_TYPE_NUMBER'] || 'number', 'NUMBER'],
  ['integer', 'INTEGER'],
];

function updatePromptType(block: Blockly.Block, type: string): void {
  block.outputConnection?.setCheck(
    type === 'NUMBER' || type === 'INTEGER' ? 'Number' : 'String',
  );
}

/** Registers the original newline block and the integer-capable prompt. */
export function registerBlocks(): void {
  Blockly.Blocks['text_newline'] = {
    init() {
      this.jsonInit({
        type: 'text_newline',
        message0: 'new line',
        output: 'String',
        style: 'text_blocks',
        tooltip: 'A new-line character.',
        helpUrl: '',
      });
    },
  };

  // Narrow override of the upstream prompt block. This retains the modern
  // standard text blocks while adding the editor's Python integer option.
  Blockly.Blocks['text_prompt_ext'] = {
    init() {
      const block = this;
      const dropdown = new Blockly.FieldDropdown(promptTypes, (newType) => {
        updatePromptType(block, newType);
        return newType;
      });
      this.appendValueInput('TEXT').appendField(dropdown, 'TYPE');
      this.setOutput(true, 'String');
      this.setStyle('text_blocks');
      this.setHelpUrl(Blockly.Msg['TEXT_PROMPT_HELPURL'] || '');
      this.setTooltip(() =>
        this.getFieldValue('TYPE') === 'TEXT'
          ? Blockly.Msg['TEXT_PROMPT_TOOLTIP_TEXT'] || 'Prompt for text.'
          : Blockly.Msg['TEXT_PROMPT_TOOLTIP_NUMBER'] || 'Prompt for a number.',
      );
    },
    mutationToDom() {
      const mutation = Blockly.utils.xml.createElement('mutation');
      mutation.setAttribute('type', this.getFieldValue('TYPE') || 'TEXT');
      return mutation;
    },
    domToMutation(xmlElement: Element) {
      updatePromptType(this, xmlElement.getAttribute('type') || 'TEXT');
    },
  };
}
