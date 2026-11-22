import type {FeatureModule} from '../types';
import {registerBuildHatBlocks as registerBlocks} from './blocks';
import {registerBuildHatPython as registerPython} from './python';
import {registerWorkspace, toolbox} from './toolbox';

export const buildHatFeature: FeatureModule = {id: 'buildhat', registerBlocks, registerPython, registerWorkspace, toolbox};
