import type {FeatureModule} from '../types';
import {registerBlocks} from './blocks';
import {registerPython} from './python';

const block = (type: string) => ({kind: 'block' as const, type});

export const turtleFeature: FeatureModule = {
  id: 'turtle',
  registerBlocks,
  registerPython,
  toolbox: [
    {
      kind: 'block',
      type: 'turtle_move',
      inputs: {DISTANCE: {shadow: {type: 'math_number', fields: {NUM: 100}}}},
    },
    {
      kind: 'block',
      type: 'turtle_turn',
      inputs: {ANGLE: {shadow: {type: 'math_number', fields: {NUM: 45}}}},
    },
    block('turtle_turn_left'),
    block('turtle_turn_right'),
    block('turtle_goto'),
    block('turtle_set_speed'),
    block('turtle_setworldcoordinates'),
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
  ],
};
