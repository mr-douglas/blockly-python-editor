import type {FeatureModule} from '../types';
import {registerBlocks} from './blocks';
import {registerPython} from './python';

export const dataTypesFeature: FeatureModule = {
  id: 'data-types',
  registerBlocks,
  registerPython,
  toolbox: [
    {kind: 'block', type: 'float'},
    {kind: 'block', type: 'int'},
    {kind: 'block', type: 'str'},
  ],
};
