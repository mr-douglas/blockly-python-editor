// @ts-nocheck -- Compatibility port of the original Blockly 5 generators.
import type {PythonGenerator} from 'blockly/python';
import {legacyBlocklyWithPython} from '../../blockly-compat/legacy';

export function registerPython(generator: PythonGenerator): void {
  const Blockly: any = legacyBlocklyWithPython(generator);


Blockly.Python.addReservedWords('time');


Blockly.Python['time_sleep'] = function(block) {
  Blockly.Python.definitions_['import_time'] = 'import time';
  var value_secs = Blockly.Python.valueToCode(block, 'SECS', Blockly.Python.ORDER_ATOMIC);
  var code = 'time.sleep('+value_secs+')\n';
  return code;
};

Blockly.Python['time_get_current_time'] = function(block) {
  Blockly.Python.definitions_['import_time'] = 'import time';
  var code = 'time.time()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};
}
