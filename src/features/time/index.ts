import type {FeatureModule} from '../types';
import {registerBlocks} from './blocks';
import {registerPython} from './python';

export const timeFeature: FeatureModule = {
  id: 'time',
  registerBlocks,
  registerPython,
  toolbox: [
    {
      kind: 'block',
      type: 'time_sleep',
      inputs: {
        SECS: {shadow: {type: 'math_number', fields: {NUM: 1}}},
      },
    },
    {kind: 'block', type: 'time_get_current_time'},
  ],
};
