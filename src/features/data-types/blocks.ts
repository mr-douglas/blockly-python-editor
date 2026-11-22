// @ts-nocheck -- Compatibility port of the original Blockly 5 block schemas.
import {legacyBlockly} from '../../blockly-compat/legacy';

export function registerBlocks(): void {
  const Blockly: any = legacyBlockly;


Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

{
  "type": "float",
  "message0": "change %1 to float (any number)",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME",
      "check": ["Number", "String"]
    }
  ],
  "output": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "int",
  "message0": "change %1 to integer (whole number)",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME",
      "check": ["Number", "String"]
    }
  ],
  "output": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "str",
  "message0": "change %1 to string (of text)",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME"
    }
  ],
  "output": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
}



]);  // END JSON EXTRACT (Do not delete this comment.)
}
