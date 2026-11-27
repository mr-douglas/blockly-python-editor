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

describe('page matches https://mr-douglas.github.io/blockly/', () => {
  const html = readFileSync(resolve(__dirname, '../src/index.html'), 'utf8');
  const css = readFileSync(resolve(__dirname, '../src/index.css'), 'utf8');
  const page = new DOMParser().parseFromString(html, 'text/html');

  it('loads Font Awesome and Varela Round', () => {
    expect(page.querySelector('script[src*="kit.fontawesome.com"]')).not.toBeNull();
    expect(page.querySelector('link[href*="Varela+Round"]')).not.toBeNull();
  });

  it('has the original round buttons, each with an icon and a label', () => {
    const expected: Record<string, [string, string]> = {
      'copy-python-button': ['fa-copy', 'Copy Python to Clipboard'],
      'save-python-button': ['fa-file-download', 'Save Python Code'],
      'run-blocks-button': ['fa-play', 'Run Program'],
      'load-blocks-button': ['fa-file-upload', 'Load Blocks from File'],
      'save-blocks-button': ['fa-file-download', 'Save Blocks to File'],
      'skulpt-close-button': ['fa-times', 'Close'],
    };
    const buttons = Array.from(page.querySelectorAll('a.my-button'));
    expect(buttons.map((button) => button.id).sort()).toEqual(
      Object.keys(expected).sort(),
    );
    for (const button of buttons) {
      const [icon, label] = expected[button.id] ?? ['', ''];
      const i = button.querySelector('.icon > i');
      expect(i?.className, button.id).toBe(`fas ${icon}`);
      expect(i?.getAttribute('aria-hidden'), button.id).toBe('true');
      expect(button.querySelector('.text')?.textContent?.trim(), button.id).toBe(label);
      expect(button.getAttribute('role'), button.id).toBe('button');
      expect(button.getAttribute('tabindex'), button.id).toBe('0');
    }
  });

  it('has the elements the editor script needs', () => {
    for (const id of [
      'blocklyDiv',
      'python-container',
      'python-div',
      'copied-alert',
      'inputfile',
      'excluder',
      'skulpt-container',
      'skulpt-console',
      'skulpt-canvas',
    ]) {
      expect(page.getElementById(id), id).not.toBeNull();
    }
  });

  it('uses the original button sizes, colours and positions', () => {
    const squashed = css.replace(/\s+/g, ' ');
    expect(squashed).toContain('a.my-button { width: 33px;');
    expect(squashed).toContain('border-width: 5px; border-radius: 30px; height: 33px;');
    expect(squashed).toContain('#load-blocks-button, #save-blocks-button, #run-blocks-button { right: calc(25vw + 10px); }');
    expect(squashed).toContain('--run-color: forestgreen;');
    expect(squashed).toContain('--load-color: darkgoldenrod;');
    expect(squashed).toContain('--save-color: indianred;');
    expect(squashed).toContain('#blocklyDiv { height: calc(100vh - 17px); width: 75%; }');
  });
});
