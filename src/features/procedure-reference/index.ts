import type {FeatureModule} from '../types';
import * as Blockly from 'blockly';
import {registerBlocks} from './blocks';
import {registerPython} from './python';

export const procedureReferenceFeature: FeatureModule = {
  id: 'procedure-reference',
  registerBlocks,
  registerPython,
  toolbox: [{kind: 'block', type: 'procedures_get_name'}],
  registerWorkspace(workspace) {
    workspace.registerToolboxCategoryCallback('PROCEDURE_WITH_REFERENCE', (ws) => {
      const items = Blockly.Procedures.flyoutCategory(ws);
      items.push(
        {kind: 'label', text: 'Use a function as a GUI callback'},
        {kind: 'block', type: 'procedures_get_name'},
      );
      return items;
    });
  },
};
