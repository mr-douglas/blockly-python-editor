// @vitest-environment jsdom

import * as Blockly from 'blockly';
import {beforeAll, describe, expect, it} from 'vitest';

import {
  buildHatFeature,
  features,
  gpiozeroFeature,
  legacyEv3Feature,
  tkinterFeature,
} from '../src/features';
import {educationalEnglish} from '../src/i18n/educational-en';

type FlyoutBlock = Blockly.utils.toolbox.BlockInfo & {
  inputs?: Record<string, any>;
};

function makeWorkspace(): Blockly.WorkspaceSvg {
  return new Blockly.WorkspaceSvg(new Blockly.Options({}));
}

function jsonFlyout(
  workspace: Blockly.WorkspaceSvg,
  callbackKey: string,
): Blockly.utils.toolbox.FlyoutItemInfo[] {
  const callback = workspace.getToolboxCategoryCallback(callbackKey);
  if (!callback) throw new Error(`Missing callback ${callbackKey}`);
  return callback(workspace) as Blockly.utils.toolbox.FlyoutItemInfo[];
}

function blockItems(items: Blockly.utils.toolbox.FlyoutItemInfo[]) {
  return items.filter((item) => item.kind === 'block') as FlyoutBlock[];
}

beforeAll(() => {
  Blockly.setLocale(educationalEnglish);
  features.forEach((feature) => feature.registerBlocks());
});

describe('dynamic educational toolbox parity', () => {
  it('offers a prefilled GUI command block for each function', () => {
    const workspace = makeWorkspace();
    tkinterFeature.registerWorkspace?.(workspace);
    const definition = workspace.newBlock('procedures_defnoreturn');
    definition.setFieldValue('show_answer', 'NAME');

    const flyout = jsonFlyout(workspace, 'GUI_Buttons');
    expect(flyout[0]).toMatchObject({
      kind: 'button',
      callbackkey: 'GUI_Buttons_CREATE',
    });
    expect(flyout[0]).not.toHaveProperty('callbackKey');
    const buttonBlocks = blockItems(flyout);
    const commands = buttonBlocks.filter(
      (item) => item.type === 'tkinter_set_button_command',
    );

    expect(commands).toHaveLength(2);
    expect(
      commands[0].inputs?.COMMAND.shadow.fields.NAME,
    ).toBe('show_answer');
    expect(commands[1].inputs).toBeUndefined();
    workspace.dispose();
  });

  it('keeps the original Build HAT motor starter values', () => {
    const workspace = makeWorkspace();
    buildHatFeature.registerWorkspace?.(workspace);
    const motors = blockItems(jsonFlyout(workspace, 'BHT_Motors'));

    expect(motors.map((item) => item.type)).toEqual([
      'bht_new_motor',
      'bht_motor_start',
      'bht_motor_stop',
      'bht_motor_get_aposition',
      'bht_motor_get_speed',
      'bht_motor_run_for_seconds',
      'bht_motor_run_for_rotations',
      'bht_motor_run_for_degrees',
      'bht_motor_run_to_position_angle',
      'bht_motor_run_to_position',
    ]);
    const degrees = motors.find(
      (item) => item.type === 'bht_motor_run_for_degrees',
    )!;
    expect(degrees.inputs?.SPEED.shadow.fields.NUM).toBe(100);
    expect(degrees.inputs?.DEGREES.shadow.fields.NUM).toBe(180);
    workspace.dispose();
  });

  it('keeps both RGB LED value/status duplicates and colour defaults', () => {
    const workspace = makeWorkspace();
    gpiozeroFeature.registerWorkspace?.(workspace);
    const rgb = blockItems(jsonFlyout(workspace, 'RPi_RGB_LED'));

    expect(rgb.map((item) => item.type)).toEqual([
      'rpi_new_rgb_led',
      'rpi_on_off',
      'rpi_toggle',
      'rpi_set_rgb_led_colour',
      'rpi_led_is_lit',
      'rpi_led_get_value',
      'rpi_led_set_value',
      'rpi_rgb_led_blink',
      'colour_tuple_values',
      'colour_tuple',
      'hex_colour_to_tuple',
      'colour_random',
    ]);
    const setValue = rgb.find((item) => item.type === 'rpi_led_set_value')!;
    expect(
      setValue.inputs?.VALUE.shadow.inputs.COLOUR.shadow.fields.COLOUR,
    ).toBe('#abcdef');
    workspace.dispose();
  });

  it('retains the legacy EV3 teaching labels and reset default', () => {
    const workspace = makeWorkspace();
    legacyEv3Feature.registerWorkspace?.(workspace);
    const callback = workspace.getToolboxCategoryCallback('EV3_SENSORS')!;
    const elements = callback(workspace) as Element[];
    const semanticItems = elements.map((element) =>
      element.tagName.toLowerCase() === 'label'
        ? `label:${element.getAttribute('text')}`
        : element.getAttribute('type') ?? element.tagName.toLowerCase(),
    );

    expect(semanticItems).toContain(
      'label:These blocks are for setting up the sensors',
    );
    expect(semanticItems).toContain(
      'label:The rest of the blocks are for use in your program',
    );
    const reset = elements.find(
      (element) => element.getAttribute('type') === 'ev3_gyro_sensor_reset_angle',
    )!;
    expect(reset.querySelector('field[name="NUM"]')?.textContent).toBe('0');
    workspace.dispose();
  });
});
