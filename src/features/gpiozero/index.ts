import type {FeatureModule} from '../types';
import {registerBlocks} from './blocks';
import {registerPython} from './python';
import {registerWorkspace, toolbox} from './toolbox';

export const gpiozeroFeature: FeatureModule = {id: 'gpiozero', registerBlocks, registerPython, registerWorkspace, toolbox};
