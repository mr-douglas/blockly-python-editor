import * as Blockly from 'blockly';
import {block} from './builders';

export {logicCategory, loopsCategory} from './presets/control';
export {mathCategory} from './presets/maths';
export {ioCategory, stringsCategory} from './presets/text';
export const variablesCategory = {kind: 'category', name: 'Variables', colour: String(Blockly.Msg.VARIABLES_HUE ?? 330), custom: 'VARIABLE'} as unknown as Blockly.utils.toolbox.DynamicCategoryInfo;
export const proceduresCategory = {kind: 'category', name: 'Functions', colour: String(Blockly.Msg.PROCEDURES_HUE ?? 290), custom: 'PROCEDURE_WITH_REFERENCE'} as unknown as Blockly.utils.toolbox.DynamicCategoryInfo;
export {block};
