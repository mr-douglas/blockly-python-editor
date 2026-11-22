// @ts-nocheck -- Compatibility port of the original Blockly 5 generators.
import type {PythonGenerator} from 'blockly/python';
import {legacyBlocklyWithPython} from '../../blockly-compat/legacy';

export function registerPython(generator: PythonGenerator): void {
  const Blockly: any = legacyBlocklyWithPython(generator);



Blockly.Python['float'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var code = 'float(' + value_name + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['int'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var code = 'int(' + value_name + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['str'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var code = 'str(' + value_name + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};


}
