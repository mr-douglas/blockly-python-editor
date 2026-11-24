import * as Blockly from 'blockly';

export interface TypedVariableCategoryConfig {
  callbackKey: string;
  createButtonText: string;
  getterBlockType: string;
  setterBlockType?: string;
  variableType: string;
  extraBlocks:
    | Blockly.utils.toolbox.FlyoutItemInfo[]
    | ((workspace: Blockly.WorkspaceSvg) => Blockly.utils.toolbox.FlyoutItemInfo[]);
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
  workspace.registerToolboxCategoryCallback(config.callbackKey, (ws) => {
    const variables = ws
      .getVariableMap()
      .getVariablesOfType(config.variableType);
    const variableBlocks = (type: string) =>
      variables.map((variable) => ({
        kind: 'block' as const,
        type,
        gap: 8,
        fields: {VAR: {id: variable.getId()}},
      }));
    const extraBlocks =
      typeof config.extraBlocks === 'function'
        ? config.extraBlocks(ws)
        : config.extraBlocks;
    return [
      {
        kind: 'button',
        text: config.createButtonText,
        // Blockly's normalized JSON schema uses a lower-case `callbackkey`;
        // `callbackKey` is the spelling used by the XML representation.
        callbackkey: buttonKey,
      },
      ...(config.setterBlockType
        ? variableBlocks(config.setterBlockType)
        : []),
      ...variableBlocks(config.getterBlockType),
      ...extraBlocks,
    ];
  });
}
