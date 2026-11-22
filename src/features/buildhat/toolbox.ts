import * as Blockly from 'blockly';

interface DeviceCategory {name: string; callbackKey: string; variableType: string; setter: string; getter: string; blocks: string[];}

const categories: DeviceCategory[] = [
  {name: 'Motors', callbackKey: 'BHT_Motors', variableType: 'BHT_Motor', setter: 'bht_variables_set_motor', getter: 'bht_variables_get_motor', blocks: ['bht_new_motor', 'bht_motor_start', 'bht_motor_stop', 'bht_motor_get_aposition', 'bht_motor_get_speed', 'bht_motor_run_for_seconds', 'bht_motor_run_for_rotations', 'bht_motor_run_for_degrees', 'bht_motor_run_to_position_angle', 'bht_motor_run_to_position']},
  {name: 'Colour Sensor', callbackKey: 'BHT_Color_Sensors', variableType: 'BHT_Color_Sensor', setter: 'bht_variables_set_color_sensor', getter: 'bht_variables_get_color_sensor', blocks: ['bht_new_color_sensor', 'bht_color_sensor_get_colour', 'bht_colour', 'bht_color_sensor_get_reflected_light', 'bht_color_sensor_get_ambient_light']},
  {name: 'Colour/Distance Sensor', callbackKey: 'BHT_Color_Distance_Sensors', variableType: 'BHT_Color_Distance_Sensor', setter: 'bht_variables_set_color_distance_sensor', getter: 'bht_variables_get_color_distance_sensor', blocks: ['bht_new_color_distance_sensor', 'bht_color_distance_sensor_get_colour', 'bht_colour', 'bht_color_distance_sensor_get_distance', 'bht_color_distance_sensor_get_reflected_light', 'bht_color_distance_sensor_get_ambient_light']},
  {name: 'Distance Sensor', callbackKey: 'BHT_Distance_Sensors', variableType: 'BHT_Distance_Sensor', setter: 'bht_variables_set_distance_sensor', getter: 'bht_variables_get_distance_sensor', blocks: ['bht_new_distance_sensor', 'bht_distance_sensor_get_distance']},
  {name: 'Force Sensor', callbackKey: 'BHT_Force_Sensors', variableType: 'BHT_Force_Sensor', setter: 'bht_variables_set_force_sensor', getter: 'bht_variables_get_force_sensor', blocks: ['bht_new_force_sensor', 'bht_force_sensor_get_force']},
  {name: 'Motion Sensor', callbackKey: 'BHT_Motion_Sensors', variableType: 'BHT_Motion_Sensor', setter: 'bht_variables_set_motion_sensor', getter: 'bht_variables_get_motion_sensor', blocks: ['bht_new_motion_sensor', 'bht_motion_sensor_get_distance']},
  {name: 'Tilt Sensor', callbackKey: 'BHT_Tilt_Sensors', variableType: 'BHT_Tilt_Sensor', setter: 'bht_variables_set_tilt_sensor', getter: 'bht_variables_get_tilt_sensor', blocks: ['bht_new_tilt_sensor', 'bht_tilt_sensor_get_tilt']},
  {name: 'Light', callbackKey: 'BHT_Lights', variableType: 'BHT_Light', setter: 'bht_variables_set_light', getter: 'bht_variables_get_light', blocks: ['bht_new_light']},
  {name: 'Matrix', callbackKey: 'BHT_Matrices', variableType: 'BHT_Matrix', setter: 'bht_variables_set_matrix', getter: 'bht_variables_get_matrix', blocks: ['bht_new_matrix']},
];

function variableBlock(type: string, variable: Parameters<typeof Blockly.Variables.generateVariableFieldDom>[0]): Element {
  const block = Blockly.utils.xml.createElement('block');
  block.setAttribute('type', type);
  block.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
  return block;
}

function registerCategory(workspace: Blockly.WorkspaceSvg, category: DeviceCategory): void {
  const buttonKey = `${category.callbackKey}_CREATE`;
  workspace.registerButtonCallback(buttonKey, (button) => Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), undefined, category.variableType));
  workspace.registerToolboxCategoryCallback(category.callbackKey, (ws) => {
    const variables = ws.getVariableMap().getVariablesOfType(category.variableType);
    return [
      Blockly.utils.xml.textToDom(`<button text="Add New ${category.name}" callbackKey="${buttonKey}"></button>`),
      ...variables.map((variable) => variableBlock(category.setter, variable)),
      ...variables.map((variable) => variableBlock(category.getter, variable)),
      ...category.blocks.map((type) => Blockly.utils.xml.textToDom(`<block type="${type}"></block>`)),
    ];
  });
}

export function registerWorkspace(workspace: Blockly.WorkspaceSvg): void {categories.forEach((category) => registerCategory(workspace, category));}

export const toolbox = [{
  kind: 'category', name: 'BuildHAT', colour: '55', contents: [
    {kind: 'category', name: 'Motors', colour: '55', custom: 'BHT_Motors'},
    {kind: 'category', name: 'Sensors', colour: '55', contents: categories.slice(1, 7).map((category) => ({kind: 'category', name: category.name, colour: '55', custom: category.callbackKey}))},
    {kind: 'category', name: 'Lights', colour: '55', contents: categories.slice(7).map((category) => ({kind: 'category', name: category.name, colour: '55', custom: category.callbackKey}))},
  ],
}] as Blockly.utils.toolbox.ToolboxItemInfo[];

// Motor-pair block definitions and generators remain registered for legacy
// workspaces, but are intentionally absent from this toolbox.
