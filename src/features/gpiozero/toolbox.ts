import type * as Blockly from 'blockly';
import {
  block,
  booleanShadow,
  colourShadow,
  numberShadow,
  shadow,
} from '../../toolbox/builders';
import {
  registerTypedVariableCategory,
  type TypedVariableCategoryConfig,
} from '../../toolbox/typed-variable-category';

interface DeviceCategory extends TypedVariableCategoryConfig {
  name: string;
}

const colourTupleShadow = (colour: string) =>
  shadow('hex_colour_to_tuple', {
    inputs: {COLOUR: colourShadow(colour)},
  });

const categories: DeviceCategory[] = [
  {
    name: 'LED',
    callbackKey: 'RPi_LED',
    createButtonText: 'Add New LED',
    variableType: 'RPi_LED',
    setterBlockType: 'rpi_variables_set_led',
    getterBlockType: 'rpi_variables_get_led',
    extraBlocks: [
      block('rpi_new_led', {inputs: {PIN: numberShadow(4)}}),
      block('rpi_on_off'),
      block('rpi_toggle'),
      block('rpi_led_is_lit'),
      block('rpi_led_get_value'),
      block('rpi_led_set_value', {inputs: {VALUE: numberShadow(0.9)}}),
      block('rpi_led_blink', {
        inputs: {
          N: numberShadow(5),
          ON_TIME: numberShadow(4),
          OFF_TIME: numberShadow(3),
          FADE_IN_TIME: numberShadow(2),
          FADE_OUT_TIME: numberShadow(1),
          NOT_BACKGROUND: booleanShadow(true),
        },
      }),
    ],
  },
  {
    name: 'RGB LED',
    callbackKey: 'RPi_RGB_LED',
    createButtonText: 'Add New RGB LED',
    variableType: 'RPi_RGB_LED',
    setterBlockType: 'rpi_variables_set_rgb_led',
    getterBlockType: 'rpi_variables_get_rgb_led',
    extraBlocks: [
      block('rpi_new_rgb_led', {
        inputs: {
          RED_PIN: numberShadow(4),
          GREEN_PIN: numberShadow(5),
          BLUE_PIN: numberShadow(6),
        },
      }),
      block('rpi_on_off'),
      block('rpi_toggle'),
      block('rpi_set_rgb_led_colour', {
        inputs: {COLOUR: colourTupleShadow('#abcdef')},
      }),
      block('rpi_led_is_lit'),
      block('rpi_led_get_value'),
      block('rpi_led_set_value', {
        inputs: {VALUE: colourTupleShadow('#abcdef')},
      }),
      block('rpi_rgb_led_blink', {
        inputs: {
          N: numberShadow(5),
          ON_TIME: numberShadow(4),
          OFF_TIME: numberShadow(3),
          FADE_IN_TIME: numberShadow(2),
          FADE_OUT_TIME: numberShadow(1),
          ON_COLOR: colourTupleShadow('#ffffff'),
          OFF_COLOR: colourTupleShadow('#000000'),
          NOT_BACKGROUND: booleanShadow(true),
        },
      }),
      block('colour_tuple_values', {
        inputs: {
          RED: numberShadow(0.5),
          GREEN: numberShadow(0.5),
          BLUE: numberShadow(0.5),
        },
      }),
      block('colour_tuple'),
      block('hex_colour_to_tuple', {
        inputs: {COLOUR: colourShadow('#abcdef')},
      }),
      block('colour_random'),
    ],
  },
  {
    name: 'Button',
    callbackKey: 'RPi_Button',
    createButtonText: 'Add New Button',
    variableType: 'RPi_Button',
    setterBlockType: 'rpi_variables_set_button',
    getterBlockType: 'rpi_variables_get_button',
    extraBlocks: [
      block('rpi_new_button', {
        inputs: {
          PIN: numberShadow(4),
          PULL_UP: booleanShadow(false),
        },
      }),
      block('rpi_button_is_pressed'),
      block('rpi_button_wait', {
        inputs: {TIMEOUT_SECS: numberShadow(5)},
      }),
    ],
  },
  {
    name: 'Light Sensor',
    callbackKey: 'RPi_Light_Sensor',
    createButtonText: 'Add New Light Sensor',
    variableType: 'RPi_Light_Sensor',
    setterBlockType: 'rpi_variables_set_light_sensor',
    getterBlockType: 'rpi_variables_get_light_sensor',
    extraBlocks: [
      block('rpi_new_light_sensor', {
        inputs: {
          PIN: numberShadow(4),
          THRESHOLD: numberShadow(0.1),
        },
      }),
      block('rpi_light_detected'),
      block('rpi_light_wait_until_light_dark'),
      block('rpi_light_sensor_get_value'),
    ],
  },
  {
    name: 'Buzzer',
    callbackKey: 'RPi_Buzzer',
    createButtonText: 'Add New Buzzer',
    variableType: 'RPi_Buzzer',
    setterBlockType: 'rpi_variables_set_buzzer',
    getterBlockType: 'rpi_variables_get_buzzer',
    extraBlocks: [
      block('rpi_new_buzzer', {inputs: {PIN: numberShadow(4)}}),
      block('rpi_buzzer_beep', {
        inputs: {
          N: numberShadow(5),
          ON_TIME: numberShadow(4),
          OFF_TIME: numberShadow(3),
          NOT_BACKGROUND: booleanShadow(true),
        },
      }),
      block('rpi_on_off'),
      block('rpi_toggle'),
      block('rpi_buzzer_is_active'),
    ],
  },
  {
    name: 'Servo',
    callbackKey: 'RPi_Servo',
    createButtonText: 'Add New Servo',
    variableType: 'RPi_Servo',
    setterBlockType: 'rpi_variables_set_servo',
    getterBlockType: 'rpi_variables_get_servo',
    extraBlocks: [
      block('rpi_new_servo', {inputs: {PIN: numberShadow(4)}}),
      block('rpi_servo_turn_to_angle', {
        inputs: {ANGLE: numberShadow(90)},
      }),
    ],
  },
  {
    name: 'Rotary Encoder',
    callbackKey: 'RPi_Rotary_Encoder',
    createButtonText: 'Add New Rotary Encoder',
    variableType: 'RPi_Rotary_Encoder',
    setterBlockType: 'rpi_variables_set_rotary_encoder',
    getterBlockType: 'rpi_variables_get_rotary_encoder',
    extraBlocks: [
      block('rpi_new_rotary_encoder', {
        inputs: {
          CLK_PIN: numberShadow(4),
          DT_PIN: numberShadow(5),
        },
      }),
      block('rpi_rotary_encoder_wait', {
        inputs: {TIMEOUT_SECS: numberShadow(5)},
      }),
      block('rpi_rotary_encoder_steps'),
    ],
  },
  {
    name: 'Ultrasonic Distance Sensor',
    callbackKey: 'RPi_USonic_Sensor',
    createButtonText: 'Add New Ultrasonic Distance Sensor',
    variableType: 'RPi_USonic_Sensor',
    setterBlockType: 'rpi_variables_set_usonic_sensor',
    getterBlockType: 'rpi_variables_get_usonic_sensor',
    extraBlocks: [
      block('rpi_new_usonic_sensor', {
        inputs: {
          TRIG: numberShadow(4),
          ECHO: numberShadow(5),
        },
      }),
      block('rpi_usonic_get_distance'),
    ],
  },
  {
    name: 'Motion Sensor',
    callbackKey: 'RPi_Motion_Sensor',
    createButtonText: 'Add New Motion Sensor',
    variableType: 'RPi_Motion_Sensor',
    setterBlockType: 'rpi_variables_set_motion_sensor',
    getterBlockType: 'rpi_variables_get_motion_sensor',
    extraBlocks: [
      block('rpi_new_motion_sensor', {inputs: {PIN: numberShadow(4)}}),
      block('rpi_motion_detected'),
    ],
  },
  {
    name: 'Digital Input',
    callbackKey: 'RPi_Digital_Input',
    createButtonText: 'Add New Digital Input',
    variableType: 'RPi_Digital_Input',
    setterBlockType: 'rpi_variables_set_digital_input',
    getterBlockType: 'rpi_variables_get_digital_input',
    extraBlocks: [
      block('rpi_new_digital_input', {inputs: {PIN: numberShadow(4)}}),
      block('rpi_digital_input_is_active'),
      block('rpi_digital_input_wait_until_active_inactive'),
    ],
  },
  {
    name: 'Digital Output',
    callbackKey: 'RPi_Digital_Output',
    createButtonText: 'Add New Digital Output',
    variableType: 'RPi_Digital_Output',
    setterBlockType: 'rpi_variables_set_digital_output',
    getterBlockType: 'rpi_variables_get_digital_output',
    extraBlocks: [
      block('rpi_new_digital_output', {inputs: {PIN: numberShadow(4)}}),
      block('rpi_on_off'),
      block('rpi_toggle'),
    ],
  },
  {
    name: 'PWM Output',
    callbackKey: 'RPi_PWM_Output',
    createButtonText: 'Add New PWM Output',
    variableType: 'RPi_PWM_Output',
    setterBlockType: 'rpi_variables_set_pwm_output',
    getterBlockType: 'rpi_variables_get_pwm_output',
    extraBlocks: [
      block('rpi_new_pwm_output', {
        inputs: {
          PIN: numberShadow(4),
          FREQUENCY: numberShadow(100),
        },
      }),
      block('rpi_on_off'),
      block('rpi_toggle'),
      block('rpi_pwm_output_set_frequency', {
        inputs: {FREQUENCY: numberShadow(100)},
      }),
      block('rpi_pwm_output_set_duty', {
        inputs: {DUTY: numberShadow(0.5)},
      }),
    ],
  },
];

export function registerWorkspace(workspace: Blockly.WorkspaceSvg): void {
  categories.forEach((category) =>
    registerTypedVariableCategory(workspace, category),
  );
}

export const toolbox = [
  {
    kind: 'category',
    name: 'Raspberry Pi',
    colour: '270',
    contents: categories.map((category) => ({
      kind: 'category',
      name: category.name,
      colour: '270',
      custom: category.callbackKey,
    })),
  },
] as Blockly.utils.toolbox.ToolboxItemInfo[];
