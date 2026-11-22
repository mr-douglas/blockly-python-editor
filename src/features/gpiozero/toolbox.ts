import * as Blockly from 'blockly';

interface DeviceCategory {
  name: string;
  callbackKey: string;
  variableType: string;
  setter: string;
  getter: string;
  blocks: string[];
}

const categories: DeviceCategory[] = [
  {name: 'LED', callbackKey: 'RPi_LED', variableType: 'RPi_LED', setter: 'rpi_variables_set_led', getter: 'rpi_variables_get_led', blocks: ['rpi_new_led', 'rpi_on_off', 'rpi_toggle', 'rpi_led_blink', 'rpi_led_set_value', 'rpi_led_get_value', 'rpi_led_is_lit']},
  {name: 'RGB LED', callbackKey: 'RPi_RGB_LED', variableType: 'RPi_RGB_LED', setter: 'rpi_variables_set_rgb_led', getter: 'rpi_variables_get_rgb_led', blocks: ['rpi_new_rgb_led', 'rpi_set_rgb_led_colour', 'rpi_on_off', 'rpi_toggle', 'rpi_rgb_led_blink', 'colour_tuple', 'colour_tuple_values', 'hex_colour_to_tuple']},
  {name: 'Button', callbackKey: 'RPi_Button', variableType: 'RPi_Button', setter: 'rpi_variables_set_button', getter: 'rpi_variables_get_button', blocks: ['rpi_new_button', 'rpi_button_is_pressed', 'rpi_button_wait']},
  {name: 'Light Sensor', callbackKey: 'RPi_Light_Sensor', variableType: 'RPi_Light_Sensor', setter: 'rpi_variables_set_light_sensor', getter: 'rpi_variables_get_light_sensor', blocks: ['rpi_new_light_sensor', 'rpi_light_sensor_get_value', 'rpi_light_detected', 'rpi_light_wait_until_light_dark']},
  {name: 'Buzzer', callbackKey: 'RPi_Buzzer', variableType: 'RPi_Buzzer', setter: 'rpi_variables_set_buzzer', getter: 'rpi_variables_get_buzzer', blocks: ['rpi_new_buzzer', 'rpi_on_off', 'rpi_toggle', 'rpi_buzzer_beep', 'rpi_buzzer_is_active']},
  {name: 'Servo', callbackKey: 'RPi_Servo', variableType: 'RPi_Servo', setter: 'rpi_variables_set_servo', getter: 'rpi_variables_get_servo', blocks: ['rpi_new_servo', 'rpi_servo_turn_to_angle']},
  {name: 'Rotary Encoder', callbackKey: 'RPi_Rotary_Encoder', variableType: 'RPi_Rotary_Encoder', setter: 'rpi_variables_set_rotary_encoder', getter: 'rpi_variables_get_rotary_encoder', blocks: ['rpi_new_rotary_encoder', 'rpi_rotary_encoder_wait', 'rpi_rotary_encoder_steps']},
  {name: 'Ultrasonic Distance Sensor', callbackKey: 'RPi_USonic_Sensor', variableType: 'RPi_USonic_Sensor', setter: 'rpi_variables_set_usonic_sensor', getter: 'rpi_variables_get_usonic_sensor', blocks: ['rpi_new_usonic_sensor', 'rpi_usonic_get_distance']},
  {name: 'Motion Sensor', callbackKey: 'RPi_Motion_Sensor', variableType: 'RPi_Motion_Sensor', setter: 'rpi_variables_set_motion_sensor', getter: 'rpi_variables_get_motion_sensor', blocks: ['rpi_new_motion_sensor', 'rpi_motion_detected']},
  {name: 'Digital Input', callbackKey: 'RPi_Digital_Input', variableType: 'RPi_Digital_Input', setter: 'rpi_variables_set_digital_input', getter: 'rpi_variables_get_digital_input', blocks: ['rpi_new_digital_input', 'rpi_digital_input_is_active', 'rpi_digital_input_wait_until_active_inactive']},
  {name: 'Digital Output', callbackKey: 'RPi_Digital_Output', variableType: 'RPi_Digital_Output', setter: 'rpi_variables_set_digital_output', getter: 'rpi_variables_get_digital_output', blocks: ['rpi_new_digital_output', 'rpi_on_off', 'rpi_toggle']},
  {name: 'PWM Output', callbackKey: 'RPi_PWM_Output', variableType: 'RPi_PWM_Output', setter: 'rpi_variables_set_pwm_output', getter: 'rpi_variables_get_pwm_output', blocks: ['rpi_new_pwm_output', 'rpi_on_off', 'rpi_toggle', 'rpi_pwm_output_set_frequency', 'rpi_pwm_output_set_duty']},
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

export function registerWorkspace(workspace: Blockly.WorkspaceSvg): void {
  categories.forEach((category) => registerCategory(workspace, category));
}

export const toolbox = [{
  kind: 'category',
  name: 'Raspberry Pi',
  colour: '270',
  contents: categories.map((category) => ({kind: 'category', name: category.name, colour: '270', custom: category.callbackKey})),
}] as Blockly.utils.toolbox.ToolboxItemInfo[];
