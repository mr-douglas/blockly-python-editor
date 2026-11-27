import * as Blockly from 'blockly';

/**
 * The original editor (https://mr-douglas.github.io/blockly/) made block
 * colours richer than Blockly's defaults (0.45 saturation, 0.65 value) with:
 *
 *   Blockly.HSV_SATURATION = 0.9;
 *   Blockly.HSV_VALUE = 0.7;
 *
 * Current Blockly keeps the same settings in `Blockly.utils.colour`.
 */
export const ORIGINAL_HSV_SATURATION = 0.9;
export const ORIGINAL_HSV_VALUE = 0.7;

type ColourSettings = {
  setHsvSaturation?: (saturation: number) => void;
  setHsvValue?: (value: number) => void;
};

/**
 * Uses the original editor's vibrant block colours. Call this before any
 * blocks are created and before `Blockly.inject`, because hue colours are
 * converted to hex when blocks and the renderer's styles are set up.
 *
 * @returns false if this Blockly version can no longer change the colours.
 */
export function useOriginalBlockColours(): boolean {
  const colour = Blockly.utils.colour as unknown as ColourSettings;
  if (
    typeof colour.setHsvSaturation !== 'function' ||
    typeof colour.setHsvValue !== 'function'
  ) {
    console.warn('Blockly can no longer change block colour richness.');
    return false;
  }
  colour.setHsvSaturation(ORIGINAL_HSV_SATURATION);
  colour.setHsvValue(ORIGINAL_HSV_VALUE);
  return true;
}
