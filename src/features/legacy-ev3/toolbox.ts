import * as Blockly from 'blockly';

function variableBlock(type: string, variable: Parameters<typeof Blockly.Variables.generateVariableFieldDom>[0]): Element {
  const block = Blockly.utils.xml.createElement('block');
  block.setAttribute('type', type);
  block.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
  return block;
}

export function registerWorkspace(workspace: Blockly.WorkspaceSvg): void {
  workspace.registerButtonCallback('EV3_MOTOR_CREATE', (button) => Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), undefined, 'EV3Motor'));
  workspace.registerToolboxCategoryCallback('EV3_MOTORS', (ws) => {
    const variables = ws.getVariableMap().getVariablesOfType('EV3Motor');
    return [
      Blockly.utils.xml.textToDom('<button text="Add New Motor" callbackKey="EV3_MOTOR_CREATE"></button>'),
      ...variables.map((variable) => variableBlock('ev3_variables_get_motor', variable)),
      ...['ev3_motor_run', 'ev3_motor_run_time', 'ev3_motor_run_angle', 'ev3_motor_run_until_stalled', 'ev3_motor_speed', 'ev3_motor_angle', 'ev3_motor_reset_angle', 'ev3_motor_stop_brake_hold'].map((type) => Blockly.utils.xml.textToDom(`<block type="${type}"></block>`)),
    ];
  });
  workspace.registerButtonCallback('EV3_SENSOR_CREATE', (button) => Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), undefined, 'EV3Sensor'));
  workspace.registerToolboxCategoryCallback('EV3_SENSORS', (ws) => {
    const variables = ws.getVariableMap().getVariablesOfType('EV3Sensor');
    return [
      Blockly.utils.xml.textToDom('<button text="Add New Sensor" callbackKey="EV3_SENSOR_CREATE"></button>'),
      ...variables.map((variable) => variableBlock('ev3_variables_get_and_set_sensor', variable)),
      ...variables.map((variable) => variableBlock('ev3_variables_get_sensor', variable)),
      ...['ev3_touch_sensor', 'ev3_colour_sensor', 'ev3_ultrasonic_sensor', 'ev3_gyro_sensor', 'ev3_color_sensor_color', 'ev3_color', 'ev3_color_sensor_ambient', 'ev3_color_sensor_reflection', 'ev3_touch_sensor_pressed', 'ev3_ultrasonic_sensor_distance', 'ev3_gyro_sensor_speed', 'ev3_gyro_angle_speed', 'ev3_gyro_sensor_reset_angle'].map((type) => Blockly.utils.xml.textToDom(`<block type="${type}"></block>`)),
    ];
  });
}

export const toolbox = [{
  kind: 'category', name: 'EV3 (Legacy)', colour: '90', contents: [
    {kind: 'category', name: 'Brick', colour: '90', contents: ['ev3_set_up', 'ev3_beep', 'ev3_set_volume', 'ev3_color', 'ev3_brick_light_on', 'ev3_brick_light_off', 'ev3_brick_buttons_pressed', 'ev3_wait', 'ev3_screen_font', 'ev3_screen_print'].map((type) => ({kind: 'block', type}))},
    {kind: 'category', name: 'Motors', colour: '90', custom: 'EV3_MOTORS'},
    {kind: 'category', name: 'Sensors', colour: '90', custom: 'EV3_SENSORS'},
  ],
}] as Blockly.utils.toolbox.ToolboxItemInfo[];
