import type {FeatureModule} from '../types';
import {registerBlocks} from './blocks';
import {registerPython} from './python';

export const textExtrasFeature: FeatureModule = {
  id: 'text-extras',
  registerBlocks,
  registerPython,
  toolbox: [{kind: 'block', type: 'text_newline'}],
};
