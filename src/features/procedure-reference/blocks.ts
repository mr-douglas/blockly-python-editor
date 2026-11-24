// @ts-nocheck -- Compatibility block retaining the original serialized ID.
import * as Blockly from 'blockly';

export function registerBlocks(): void {
  Blockly.Blocks['procedures_get_name'] = {
    init() {
      this.procedureName_ = '';
      this.procedureId_ = '';
      this.setOutput(true, 'PROCEDURE');
      this.setStyle('procedure_blocks');
      this.appendDummyInput().appendField(
        new Blockly.FieldDropdown(this.dropdownProcedureNames_.bind(this)),
        'NAME',
      );
      this.setTooltip('Get a reference to the named procedure.');
    },
    dropdownProcedureNames_() {
      const workspace = this.workspace?.isFlyout
        ? this.workspace.targetWorkspace
        : this.workspace;
      const [withoutReturn, withReturn] = Blockly.Procedures.allProcedures(
        workspace,
      );
      const names = [...withoutReturn, ...withReturn].map((entry) => entry[0]);
      if (this.procedureName_ && !names.includes(this.procedureName_)) {
        names.unshift(this.procedureName_);
      }
      return names.length
        ? names.map((name) => [name, name])
        : [[Blockly.Msg['UNNAMED_KEY'] || 'unnamed', '']];
    },
    renameProcedure(oldName, newName) {
      if (!Blockly.Names.equals(oldName, this.procedureName_)) return;
      this.procedureName_ = newName;
      this.getField('NAME')?.setValue(newName);
    },
    onchange(event) {
      if (!this.workspace || this.workspace.isFlyout) return;
      const value = this.getFieldValue('NAME');
      if (value) this.procedureName_ = value;

      if (
        event &&
        event.type !== Blockly.Events.BLOCK_CREATE &&
        event.type !== Blockly.Events.BLOCK_DELETE &&
        event.type !== Blockly.Events.BLOCK_CHANGE
      ) {
        return;
      }

      const field = this.getField('NAME');
      if (field) {
        field.menuGenerator_ = this.dropdownProcedureNames_.bind(this);
        field.generatedOptions_ = null;
      }

      if (!this.procedureId_ && this.procedureName_) {
        const definition = Blockly.Procedures.getDefinition(
          this.procedureName_,
          this.workspace,
        );
        if (definition) this.procedureId_ = definition.id;
      }

      if (!this.procedureId_) return;
      const definition = this.workspace.getBlockById(this.procedureId_);
      if (!definition) {
        this.dispose(true);
        return;
      }

      const actualName = definition.getFieldValue('NAME');
      if (actualName && actualName !== this.procedureName_) {
        this.procedureName_ = actualName;
        Blockly.Events.disable();
        try {
          this.setFieldValue(actualName, 'NAME');
        } finally {
          Blockly.Events.enable();
        }
      }
    },
    mutationToDom() {
      const mutation = Blockly.utils.xml.createElement('mutation');
      mutation.setAttribute('name', this.getFieldValue('NAME') || '');
      return mutation;
    },
    domToMutation(xmlElement) {
      const name = xmlElement.getAttribute('name') || '';
      this.procedureName_ = name;
      this.getField('NAME')?.setValue(name);
    },
  };
}
