import * as Blockly from 'blockly';

export interface TypedVariableCategoryConfig {
  callbackKey: string;
  createButtonText: string;
  getterBlockType: string;
  variableType: string;
  extraBlocks: Blockly.utils.toolbox.FlyoutItemInfo[];
}

/** Registers the repeated typed-variable flyout pattern used by GUI/hardware. */
export function registerTypedVariableCategory(
  workspace: Blockly.WorkspaceSvg,
  config: TypedVariableCategoryConfig,
): void {
  const buttonKey = `${config.callbackKey}_CREATE`;
  workspace.registerButtonCallback(buttonKey, (button) => {
    Blockly.Variables.createVariableButtonHandler(
      button.getTargetWorkspace(),
      undefined,
      config.variableType,
    );
  });
  workspace.registerToolboxCategoryCallback(config.callbackKey, (ws) => [
    {
      kind: 'button',
      text: config.createButtonText,
      callbackKey: buttonKey,
    },
    ...ws
      .getVariableMap()
      .getVariablesOfType(config.variableType)
      .map((variable) => ({
        kind: 'block' as const,
        type: config.getterBlockType,
        fields: {VAR: {id: variable.getId()}},
      })),
    ...config.extraBlocks,
  ]);
}
