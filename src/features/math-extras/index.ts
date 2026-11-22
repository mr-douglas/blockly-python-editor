import type {FeatureModule} from '../types';
import {registerBlocks} from './blocks';
import {registerPython} from './python';

export const mathExtrasFeature: FeatureModule = {
  id: 'math-extras',
  registerBlocks,
  registerPython,
  toolbox: [
    {kind: 'block', type: 'math_trig'},
    {kind: 'block', type: 'math_inv_trig'},
    {kind: 'block', type: 'math_constant'},
  ],
};
