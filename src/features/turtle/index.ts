import type {FeatureModule} from '../types';
import {
  block,
  colourShadow,
  numberShadow,
} from '../../toolbox/builders';
import {registerBlocks} from './blocks';
import {registerPython} from './python';

export const turtleFeature: FeatureModule = {
  id: 'turtle',
  registerBlocks,
  registerPython,
  toolbox: [
    {
      ...block('turtle_move'),
      inputs: {DISTANCE: numberShadow(100)},
    },
    {
      ...block('turtle_turn'),
      inputs: {ANGLE: numberShadow(45)},
    },
    block('turtle_turn_left'),
    block('turtle_turn_right'),
    block('turtle_goto', {
      inputs: {X: numberShadow(0), Y: numberShadow(0)},
    }),
    block('turtle_set_speed'),
    block('turtle_setworldcoordinates', {
      inputs: {
        X_MIN: numberShadow(-200),
        Y_MIN: numberShadow(-200),
        X_MAX: numberShadow(200),
        Y_MAX: numberShadow(200),
      },
    }),
    block('turtle_pen_up_down'),
    block('turtle_pen_colour'),
    block('turtle_fill_colour'),
    block('turtle_pen_fill_colour'),
    block('turtle_begin_fill'),
    block('turtle_end_fill'),
    block('turtle_begin_end_fill'),
    block('turtle_set_pen_size'),
    block('turtle_set_direction_four'),
    block('turtle_set_direction_angle'),
    block('turtle_set_direction'),
    block('turtle_get_coord'),
    block('turtle_show'),
    block('turtle_hide'),
    block('colour_picker'),
    block('colour_random'),
    block('colour_rgb', {
      inputs: {
        RED: numberShadow(100),
        GREEN: numberShadow(50),
        BLUE: numberShadow(0),
      },
    }),
    block('colour_blend', {
      inputs: {
        COLOUR1: colourShadow('#ff0000'),
        COLOUR2: colourShadow('#3333ff'),
        RATIO: numberShadow(0.5),
      },
    }),
  ],
};
