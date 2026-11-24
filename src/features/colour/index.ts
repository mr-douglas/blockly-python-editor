import {
  colourBlend,
  colourPicker,
  colourRandom,
  colourRgb,
  installAllBlocks,
} from '@blockly/field-colour';
import type {FeatureModule} from '../types';

/**
 * Blockly 13 moved its standard colour blocks into the maintained colour-field
 * plugin.  Register that official implementation here so the legacy toolbox
 * entries remain available without copying old Blockly source into the app.
 */
export const colourFeature: FeatureModule = {
  id: 'colour',
  registerBlocks() {
    installAllBlocks();
  },
  registerPython(generator) {
    generator.forBlock[colourPicker.BLOCK_NAME] = colourPicker.toPython;
    generator.forBlock[colourRandom.BLOCK_NAME] = colourRandom.toPython;
    generator.forBlock[colourRgb.BLOCK_NAME] = colourRgb.toPython;
    generator.forBlock[colourBlend.BLOCK_NAME] = colourBlend.toPython;
  },
  // Colour presets are intentionally presented inside Turtle and RGB LED,
  // matching the original educational palette rather than adding a category.
  toolbox: [],
};
