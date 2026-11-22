// @ts-nocheck -- Compatibility port of the original Blockly 5 generators.
import type {PythonGenerator} from 'blockly/python';
import {legacyBlocklyWithPython} from '../../blockly-compat/legacy';

export function registerPython(generator: PythonGenerator): void {
  const Blockly: any = legacyBlocklyWithPython(generator);


Blockly.Python['import_user_library'] = function(block) {
  var library = (block.getFieldValue('LIBRARY') || '').trim();
  if (!library) {
    // Keep an incomplete import visible at its block position. The educational
    // scrubber leaves it commented, and Blockly can still follow the stack.
    return '#import \n';
  }
  var definitionName = 'import_user_library_' + library;
  Blockly.Python.definitions_[definitionName] = 'import ' + library;
  // Returning null here would stop generation for the rest of this stack.
  return '';
};

Blockly.Python['insert_user_code'] = function(block) {
  var text_user_code = block.getFieldValue('user_code');
  Blockly.Python.definitions_['custom_code'] = "#You've added your own code";
  var code = text_user_code + '\n';
  return code;
};

}
