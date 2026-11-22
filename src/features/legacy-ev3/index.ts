import type {FeatureModule} from '../types';
import {registerBlocks} from './blocks';
import {registerPython} from './python';
import {registerWorkspace, toolbox} from './toolbox';

/** Optional legacy feature retained for existing projects; no new support. */
export const legacyEv3Feature: FeatureModule = {id: 'legacy-ev3', registerBlocks, registerPython, registerWorkspace, toolbox};
