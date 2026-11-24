import * as Blockly from 'blockly';

function variableBlock(type: string, variable: Parameters<typeof Blockly.Variables.generateVariableFieldDom>[0]): Element {
  const block = Blockly.utils.xml.createElement('block');
  block.setAttribute('type', type);
  block.setAttribute('gap', '8');
  block.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
  return block;
}

const motorBlocks = [
  '<block type="ev3_motor_run"><value name="SPEED"><shadow type="math_number"><field name="NUM">90</field></shadow></value></block>',
  '<block type="ev3_motor_run_time"><value name="SPEED"><shadow type="math_number"><field name="NUM">90</field></shadow></value><value name="TIME"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>',
  '<block type="ev3_motor_run_angle"><value name="SPEED"><shadow type="math_number"><field name="NUM">90</field></shadow></value><value name="ANGLE"><shadow type="math_number"><field name="NUM">90</field></shadow></value></block>',
  '<block type="ev3_motor_run_until_stalled"><value name="SPEED"><shadow type="math_number"><field name="NUM">90</field></shadow></value><value name="DUTY_LIMIT"><shadow type="math_number"><field name="NUM">50</field></shadow></value></block>',
  '<block type="ev3_motor_speed"></block>',
  '<block type="ev3_motor_angle"></block>',
  '<block type="ev3_motor_reset_angle"><value name="ANGLE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>',
  '<block type="ev3_motor_stop_brake_hold"></block>',
];

const sensorSetupBlocks = [
  'ev3_touch_sensor',
  'ev3_colour_sensor',
  'ev3_ultrasonic_sensor',
  'ev3_gyro_sensor',
];

const sensorProgramSections = [
  {
    label: 'Color Sensor',
    blocks: [
      '<block type="ev3_color_sensor_color"></block>',
      '<block type="ev3_color"></block>',
      '<block type="ev3_color_sensor_ambient"></block>',
      '<block type="ev3_color_sensor_reflection"></block>',
    ],
  },
  {
    label: 'Touch Sensor',
    blocks: ['<block type="ev3_touch_sensor_pressed"></block>'],
  },
  {
    label: 'Ultrasonic Sensor',
    blocks: ['<block type="ev3_ultrasonic_sensor_distance"></block>'],
  },
  {
    label: 'Gyroscopic Sensor',
    blocks: [
      '<block type="ev3_gyro_sensor_speed"></block>',
      '<block type="ev3_gyro_angle_speed"></block>',
      '<block type="ev3_gyro_sensor_reset_angle"><value name="ANGLE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>',
    ],
  },
];

function label(text: string): Element {
  return Blockly.utils.xml.textToDom(`<label text="${text}"></label>`);
}

function sensorProgramBlocks(): Element[] {
  const items: Element[] = [];
  sensorProgramSections.forEach((section) => {
    items.push(
      label(section.label),
      ...section.blocks.map((xml) => Blockly.utils.xml.textToDom(xml)),
    );
  });
  return items;
}

export function registerWorkspace(workspace: Blockly.WorkspaceSvg): void {
  workspace.registerButtonCallback('EV3_MOTOR_CREATE', (button) => Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), undefined, 'EV3Motor'));
  workspace.registerToolboxCategoryCallback('EV3_MOTORS', (ws) => {
    const variables = ws.getVariableMap().getVariablesOfType('EV3Motor');
    return [
      Blockly.utils.xml.textToDom('<button text="Add New Motor" callbackKey="EV3_MOTOR_CREATE"></button>'),
      ...(variables.length ? [label('Motors')] : []),
      ...variables.map((variable) => variableBlock('ev3_variables_get_motor', variable)),
      ...motorBlocks.map((xml) => Blockly.utils.xml.textToDom(xml)),
    ];
  });
  workspace.registerButtonCallback('EV3_SENSOR_CREATE', (button) => Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), undefined, 'EV3Sensor'));
  workspace.registerToolboxCategoryCallback('EV3_SENSORS', (ws) => {
    const variables = ws.getVariableMap().getVariablesOfType('EV3Sensor');
    return [
      Blockly.utils.xml.textToDom('<button text="Add New Sensor" callbackKey="EV3_SENSOR_CREATE"></button>'),
      label('These blocks are for setting up the sensors'),
      ...variables.map((variable) => variableBlock('ev3_variables_get_and_set_sensor', variable)),
      ...sensorSetupBlocks.map((type) => Blockly.utils.xml.textToDom(`<block type="${type}"></block>`)),
      label('The rest of the blocks are for use in your program'),
      ...variables.map((variable) => variableBlock('ev3_variables_get_sensor', variable)),
      ...sensorProgramBlocks(),
    ];
  });
}

export const toolbox = [{
  kind: 'category', name: 'EV3', colour: '90', contents: [
    {kind: 'category', name: 'Brick', colour: '90', contents: [
      {kind: 'block', type: 'ev3_set_up'},
      {
        kind: 'block',
        type: 'ev3_beep',
        inputs: {
          FREQUENCY: {shadow: {type: 'math_number', fields: {NUM: 500}}},
          DURATION: {shadow: {type: 'math_number', fields: {NUM: 1}}},
        },
      },
      {
        kind: 'block',
        type: 'ev3_set_volume',
        inputs: {VOLUME: {shadow: {type: 'math_number', fields: {NUM: 50}}}},
      },
      {kind: 'block', type: 'ev3_color'},
      {
        kind: 'block',
        type: 'ev3_brick_light_on',
        inputs: {
          COLOR: {shadow: {type: 'ev3_color', fields: {COLOR: '#00cc00'}}},
        },
      },
      {kind: 'block', type: 'ev3_brick_light_off'},
      {kind: 'block', type: 'ev3_brick_buttons_pressed'},
      {
        kind: 'block',
        type: 'ev3_wait',
        inputs: {TIME: {shadow: {type: 'math_number', fields: {NUM: 60}}}},
      },
      {kind: 'block', type: 'ev3_screen_font'},
      {kind: 'block', type: 'ev3_screen_print'},
    ]},
    {kind: 'category', name: 'Motors', colour: '90', custom: 'EV3_MOTORS'},
    {kind: 'category', name: 'Sensors', colour: '90', custom: 'EV3_SENSORS'},
    {kind: 'block', type: 'ev3_set_up'},
    {kind: 'block', type: 'ev3_color'},
  ],
}] as Blockly.utils.toolbox.ToolboxItemInfo[];
