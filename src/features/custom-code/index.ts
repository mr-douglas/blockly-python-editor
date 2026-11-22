import type {FeatureModule} from '../types';
import {registerBlocks} from './blocks';
import {registerPython} from './python';

export const customCodeFeature: FeatureModule = {
  id: 'custom-code',
  registerBlocks,
  registerPython,
  toolbox: [
    {kind: 'block', type: 'import_user_library'},
    {kind: 'block', type: 'insert_user_code'},
  ],
};
