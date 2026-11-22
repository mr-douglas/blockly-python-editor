import type {FeatureModule} from '../types';
import {registerBlocks} from './blocks';
import {registerPython} from './python';
import {registerWorkspace, toolbox} from './toolbox';

export const tkinterFeature: FeatureModule = {
  id: 'tkinter',
  registerBlocks,
  registerPython,
  registerWorkspace,
  toolbox,
};
