import * as Blockly from 'blockly';
import {block, category, numberShadow} from '../../toolbox/builders';
import {registerTypedVariableCategory} from '../../toolbox/typed-variable-category';

type BuildHatSection = 'Motors' | 'Sensors' | 'Lights';

interface DeviceCategory {
  name: string;
  section: BuildHatSection;
  callbackKey: string;
  variableType: string;
  setterBlockType: string;
  getterBlockType: string;
  blocks: Blockly.utils.toolbox.FlyoutItemInfo[];
}

const motorBlocks: Blockly.utils.toolbox.FlyoutItemInfo[] = [
  block('bht_new_motor'),
  block('bht_motor_start', {
    inputs: {SPEED: numberShadow(100)},
  }),
  block('bht_motor_stop'),
  block('bht_motor_get_aposition'),
  block('bht_motor_get_speed'),
  block('bht_motor_run_for_seconds', {
    inputs: {
      SPEED: numberShadow(100),
      TIME: numberShadow(1),
    },
  }),
  block('bht_motor_run_for_rotations', {
    inputs: {
      SPEED: numberShadow(100),
      ROTATIONS: numberShadow(1),
    },
  }),
  block('bht_motor_run_for_degrees', {
    inputs: {
      SPEED: numberShadow(100),
      DEGREES: numberShadow(180),
    },
  }),
  block('bht_motor_run_to_position_angle', {
    inputs: {SPEED: numberShadow(100)},
  }),
  block('bht_motor_run_to_position', {
    inputs: {
      SPEED: numberShadow(100),
      POSITION: numberShadow(0),
    },
  }),
];

const categories: DeviceCategory[] = [
  {
    name: 'Motors',
    section: 'Motors',
    callbackKey: 'BHT_Motors',
    variableType: 'BHT_Motor',
    setterBlockType: 'bht_variables_set_motor',
    getterBlockType: 'bht_variables_get_motor',
    blocks: motorBlocks,
  },
  {
    name: 'Colour Sensor',
    section: 'Sensors',
    callbackKey: 'BHT_Color_Sensors',
    variableType: 'BHT_Color_Sensor',
    setterBlockType: 'bht_variables_set_color_sensor',
    getterBlockType: 'bht_variables_get_color_sensor',
    blocks: [
      block('bht_new_color_sensor'),
      block('bht_color_sensor_get_colour'),
      block('bht_colour'),
      block('bht_color_sensor_get_reflected_light'),
      block('bht_color_sensor_get_ambient_light'),
    ],
  },
  {
    name: 'Colour/Distance Sensor',
    section: 'Sensors',
    callbackKey: 'BHT_Color_Distance_Sensors',
    variableType: 'BHT_Color_Distance_Sensor',
    setterBlockType: 'bht_variables_set_color_distance_sensor',
    getterBlockType: 'bht_variables_get_color_distance_sensor',
    blocks: [
      block('bht_new_color_distance_sensor'),
      block('bht_color_distance_sensor_get_colour'),
      block('bht_color_distance_sensor_get_distance'),
      block('bht_color_distance_sensor_get_reflected_light'),
      block('bht_color_distance_sensor_get_ambient_light'),
    ],
  },
  {
    name: 'Distance Sensor',
    section: 'Sensors',
    callbackKey: 'BHT_Distance_Sensors',
    variableType: 'BHT_Distance_Sensor',
    setterBlockType: 'bht_variables_set_distance_sensor',
    getterBlockType: 'bht_variables_get_distance_sensor',
    blocks: [
      block('bht_new_distance_sensor'),
      block('bht_distance_sensor_get_distance'),
    ],
  },
  {
    name: 'Force Sensor',
    section: 'Sensors',
    callbackKey: 'BHT_Force_Sensors',
    variableType: 'BHT_Force_Sensor',
    setterBlockType: 'bht_variables_set_force_sensor',
    getterBlockType: 'bht_variables_get_force_sensor',
    blocks: [
      block('bht_new_force_sensor'),
      block('bht_force_sensor_get_force'),
    ],
  },
  {
    name: 'Motion Sensor',
    section: 'Sensors',
    callbackKey: 'BHT_Motion_Sensors',
    variableType: 'BHT_Motion_Sensor',
    setterBlockType: 'bht_variables_set_motion_sensor',
    getterBlockType: 'bht_variables_get_motion_sensor',
    blocks: [
      block('bht_new_motion_sensor'),
      block('bht_motion_sensor_get_distance'),
    ],
  },
  {
    name: 'Tilt Sensor',
    section: 'Sensors',
    callbackKey: 'BHT_Tilt_Sensors',
    variableType: 'BHT_Tilt_Sensor',
    setterBlockType: 'bht_variables_set_tilt_sensor',
    getterBlockType: 'bht_variables_get_tilt_sensor',
    blocks: [
      block('bht_new_tilt_sensor'),
      block('bht_tilt_sensor_get_tilt'),
    ],
  },
  {
    name: 'Light',
    section: 'Lights',
    callbackKey: 'BHT_Lights',
    variableType: 'BHT_Light',
    setterBlockType: 'bht_variables_set_light',
    getterBlockType: 'bht_variables_get_light',
    blocks: [block('bht_new_light')],
  },
  {
    name: 'Matrix',
    section: 'Lights',
    callbackKey: 'BHT_Matrices',
    variableType: 'BHT_Matrix',
    setterBlockType: 'bht_variables_set_matrix',
    getterBlockType: 'bht_variables_get_matrix',
    blocks: [block('bht_new_matrix')],
  },
];

export function registerWorkspace(workspace: Blockly.WorkspaceSvg): void {
  for (const device of categories) {
    registerTypedVariableCategory(workspace, {
      callbackKey: device.callbackKey,
      createButtonText: `Add New ${device.name}`,
      variableType: device.variableType,
      setterBlockType: device.setterBlockType,
      getterBlockType: device.getterBlockType,
      extraBlocks: device.blocks,
    });
  }
}

const dynamicCategory = (
  device: DeviceCategory,
): Blockly.utils.toolbox.DynamicCategoryInfo =>
  ({
    kind: 'category',
    name: device.name,
    colour: '55',
    custom: device.callbackKey,
  }) as unknown as Blockly.utils.toolbox.DynamicCategoryInfo;

const section = (name: Exclude<BuildHatSection, 'Motors'>) =>
  category(
    name,
    '55',
    categories
      .filter((device) => device.section === name)
      .map(dynamicCategory),
  );

export const toolbox: Blockly.utils.toolbox.ToolboxItemInfo[] = [
  category('BuildHAT', '55', [
    dynamicCategory(categories[0]),
    section('Sensors'),
    section('Lights'),
  ]),
];

// Motor-pair block definitions and generators remain registered for legacy
// workspaces, but are intentionally absent from this toolbox.
