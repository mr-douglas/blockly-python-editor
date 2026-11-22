// @ts-nocheck -- Compatibility port of the original Blockly 5 block schemas.
import {legacyBlockly} from '../../blockly-compat/legacy';

export function registerBlocks(): void {
  const Blockly: any = legacyBlockly;


Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
{
  "type": "time_sleep",
  "message0": "wait for %1 seconds",
  "args0": [
    {
      "type": "input_value",
      "name": "SECS",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "time_get_current_time",
  "message0": "current time",
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}
]);  // END JSON EXTRACT (Do not delete this comment.)
}
