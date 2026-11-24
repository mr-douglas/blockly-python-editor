import * as Blockly from 'blockly';

function updatePromptType(block: Blockly.Block, type: string): void {
  block.outputConnection?.setCheck(
    type === 'NUMBER' || type === 'INTEGER' ? 'Number' : 'String',
  );
  block.setColour(
    type === 'TEXT'
      ? Blockly.Msg['TEXTS_HUE'] || '160'
      : Blockly.Msg['MATH_HUE'] || '230',
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
        tooltip: "A newline character '\\n'",
        helpUrl: '',
      });
    },
  };

  // Narrow override of the upstream prompt block. This retains the modern
  // standard text blocks while adding the editor's Python integer option.
  Blockly.Blocks['text_prompt_ext'] = {
    init() {
      const block = this;
      const promptTypes: Blockly.MenuOption[] = [
        [
          Blockly.Msg['TEXT_PROMPT_TYPE_TEXT'] ||
            'get text input from user with message',
          'TEXT',
        ],
        [
          Blockly.Msg['TEXT_PROMPT_TYPE_NUMBER'] ||
            'get number input from user with message',
          'NUMBER',
        ],
        [
          Blockly.Msg['TEXT_PROMPT_TYPE_INTEGER'] ||
            'get integer input from user with message',
          'INTEGER',
        ],
      ];
      const dropdown = new Blockly.FieldDropdown(promptTypes, (newType) => {
        updatePromptType(block, newType);
        return newType;
      });
      this.appendValueInput('TEXT').appendField(dropdown, 'TYPE');
      this.setOutput(true, 'String');
      this.setStyle('text_blocks');
      updatePromptType(this, 'TEXT');
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
