import * as Blockly from 'blockly';
import {
  buildHatFeature,
  collectionsFeature,
  customCodeFeature,
  dataTypesFeature,
  gpiozeroFeature,
  legacyEv3Feature,
  timeFeature,
  tkinterFeature,
  turtleFeature,
} from '../features';
import {
  ioCategory,
  logicCategory,
  loopsCategory,
  mathCategory,
  proceduresCategory,
  stringsCategory,
  variablesCategory,
} from './base';

const category = (
  name: string,
  colour: string,
  contents: Blockly.utils.toolbox.ToolboxItemInfo[],
): Blockly.utils.toolbox.StaticCategoryInfo => ({
  kind: 'category',
  name,
  colour,
  contents,
}) as unknown as Blockly.utils.toolbox.StaticCategoryInfo;

const separator = {kind: 'sep'} as Blockly.utils.toolbox.SeparatorInfo;

/** Declarative replacement for the original 200-line XML toolbox string. */
export const toolbox: Blockly.utils.toolbox.ToolboxDefinition = {
  kind: 'categoryToolbox',
  contents: [
    mathCategory,
    ioCategory,
    category('Time', String(Blockly.Msg.MATH_HUE ?? 230), timeFeature.toolbox),
    stringsCategory,
    separator,
    logicCategory,
    loopsCategory,
    category('Data Types', String(Blockly.Msg.VARIABLES_HUE ?? 330), dataTypesFeature.toolbox),
    separator,
    category('Lists', String(Blockly.Msg.LISTS_HUE ?? 260), collectionsFeature.toolbox),
    variablesCategory,
    proceduresCategory,
    separator,
    category('Turtle', String(Blockly.Msg.COLOUR_HUE ?? 20), turtleFeature.toolbox),
    ...tkinterFeature.toolbox,
    ...legacyEv3Feature.toolbox,
    ...buildHatFeature.toolbox,
    ...gpiozeroFeature.toolbox,
    separator,
    category('Insert Your Own Code', '#000000', customCodeFeature.toolbox),
  ],
};
