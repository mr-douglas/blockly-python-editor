import type * as Blockly from 'blockly';
import type {PythonGenerator} from 'blockly/python';

/** A self-contained group of blocks, generators, and toolbox entries. */
export interface FeatureModule {
  id: string;
  registerBlocks(): void;
  registerPython(generator: PythonGenerator): void;
  toolbox: Blockly.utils.toolbox.ToolboxItemInfo[];
  registerWorkspace?(workspace: Blockly.WorkspaceSvg): void;
}
