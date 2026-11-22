import type {FeatureModule} from '../types';
import {registerBlocks} from './blocks';
import {registerPython} from './python';

export const errorsFeature: FeatureModule = {
  id: 'errors',
  registerBlocks,
  registerPython,
  toolbox: [
    {kind: 'label', text: 'Handling errors'},
    {kind: 'block', type: 'controls_try_except_finally'},
  ],
};
