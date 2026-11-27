// @vitest-environment jsdom

import * as Blockly from 'blockly';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {describe, expect, it} from 'vitest';

import {useOriginalBlockColours} from '../src/theme/original-block-colours';

describe('original block colours', () => {
  it('converts hues with the original editor saturation and value', () => {
    // Blockly's defaults, before the change.
    expect(Blockly.utils.colour.hueToHex(230)).toBe('#5b67a5');

    expect(useOriginalBlockColours()).toBe(true);

    // The same colours as https://mr-douglas.github.io/blockly/
    // (HSV_SATURATION 0.9, HSV_VALUE 0.7).
    expect(Blockly.utils.colour.hueToHex(230)).toBe('#112cb2');
    expect(Blockly.utils.colour.hueToHex(120)).toBe('#11b211');
    expect(Blockly.utils.colour.hueToHex(20)).toBe('#b24711');
    // Block and toolbox colours given as hues (including the Classic theme's
    // block styles) are converted the same way.
    expect(Blockly.utils.parsing.parseBlockColour('210').hex).toBe('#1162b2');
  });
});

describe('Font Awesome icons', () => {
  const html = readFileSync(resolve(__dirname, '../src/index.html'), 'utf8');
  const page = new DOMParser().parseFromString(html, 'text/html');

  it('loads Font Awesome', () => {
    const script = page.querySelector('script[src*="kit.fontawesome.com"]');
    expect(script).not.toBeNull();
  });

  it('gives every round button a Font Awesome icon and a label', () => {
    const buttons = Array.from(page.querySelectorAll('button.round-action'));
    expect(buttons.length).toBe(6);
    for (const button of buttons) {
      const icon = button.querySelector('i');
      expect(icon?.className, button.id).toMatch(/^fas fa-[a-z-]+$/);
      expect(icon?.getAttribute('aria-hidden'), button.id).toBe('true');
      expect(button.querySelector('span')?.textContent?.trim(), button.id).not.toBe('');
    }
  });
});
