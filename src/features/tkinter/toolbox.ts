import * as Blockly from 'blockly';

interface TypedCategory {
  callbackKey: string;
  buttonText: string;
  variableType: string;
  getterType: string;
  blocks: string[];
}

const categories: TypedCategory[] = [
  {
    callbackKey: 'GUI_Windows',
    buttonText: 'Create window...',
    variableType: 'GUI_Window',
    getterType: 'tkinter_variables_get_window',
    blocks: [
      '<block type="tkinter_set_window_as_root"></block>',
      '<block type="tkinter_set_additional_window"></block>',
      '<block type="tkinter_window_mainloop"></block>',
      '<block type="tkinter_window_set_title"><value name="TITLE"><shadow type="text"><field name="TEXT">My Window</field></shadow></value></block>',
      '<block type="tkinter_window_set_dimensions"><value name="WIDTH"><shadow type="math_number"><field name="NUM">400</field></shadow></value><value name="HEIGHT"><shadow type="math_number"><field name="NUM">400</field></shadow></value></block>',
      '<block type="tkinter_window_set_resizable"></block>',
      '<block type="tkinter_window_after"><value name="TIME"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>',
      '<block type="tkinter_window_set_close_command"></block>',
      '<block type="tkinter_window_destroy"></block>',
    ],
  },
  {
    callbackKey: 'GUI_Labels',
    buttonText: 'Create label...',
    variableType: 'GUI_Label',
    getterType: 'tkinter_variables_get_label',
    blocks: [
      '<block type="tkinter_add_widget_to_window"></block>',
      '<block type="tkinter_set_widget_text"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block>',
      '<block type="tkinter_set_widget_width"><value name="WIDTH"><shadow type="math_number"><field name="NUM">20</field></shadow></value></block>',
      '<block type="tkinter_set_widget_justify"></block>',
      '<block type="tkinter_set_widget_font"><value name="FACE"><shadow type="text"><field name="TEXT">Arial</field></shadow></value><value name="SIZE"><shadow type="math_number"><field name="NUM">12</field></shadow></value></block>',
      '<block type="tkinter_set_label_wraplength"><value name="WRAPLENGTH"><shadow type="math_number"><field name="NUM">200</field></shadow></value></block>',
      '<block type="tkinter_set_label_image"><value name="FILE"><shadow type="text"><field name="TEXT">image.png</field></shadow></value></block>',
      '<block type="tkinter_set_label_image_pillow"><value name="FILE"><shadow type="text"><field name="TEXT">image.jpg</field></shadow></value></block>',
    ],
  },
  {
    callbackKey: 'GUI_Buttons',
    buttonText: 'Create button...',
    variableType: 'GUI_Button',
    getterType: 'tkinter_variables_get_button',
    blocks: [
      '<block type="tkinter_add_widget_to_window"></block>',
      '<block type="tkinter_set_widget_text"><value name="TEXT"><shadow type="text"><field name="TEXT">Click here</field></shadow></value></block>',
      '<block type="tkinter_set_button_command"></block>',
      '<block type="tkinter_set_widget_width"><value name="WIDTH"><shadow type="math_number"><field name="NUM">20</field></shadow></value></block>',
      '<block type="tkinter_button_set_enabled"></block>',
    ],
  },
  {
    callbackKey: 'GUI_Entries',
    buttonText: 'Create entry...',
    variableType: 'GUI_Entry',
    getterType: 'tkinter_variables_get_entry',
    blocks: [
      '<block type="tkinter_add_widget_to_window"></block>',
      '<block type="tkinter_set_widget_width"><value name="WIDTH"><shadow type="math_number"><field name="NUM">20</field></shadow></value></block>',
      '<block type="tkinter_entry_get_text"></block>',
      '<block type="tkinter_entry_insert_at_end"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block>',
      '<block type="tkinter_entry_delete_from_start"></block>',
      '<block type="tkinter_set_widget_justify"></block>',
      '<block type="tkinter_set_widget_font"><value name="FACE"><shadow type="text"><field name="TEXT">Arial</field></shadow></value><value name="SIZE"><shadow type="math_number"><field name="NUM">12</field></shadow></value></block>',
      '<block type="tkinter_set_entry_combobox_readonly"></block>',
    ],
  },
  {
    callbackKey: 'GUI_Comboboxes',
    buttonText: 'Create combobox...',
    variableType: 'GUI_Combobox',
    getterType: 'tkinter_variables_get_combobox',
    blocks: [
      '<block type="tkinter_add_widget_to_window"></block>',
      '<block type="tkinter_set_widget_width"><value name="WIDTH"><shadow type="math_number"><field name="NUM">20</field></shadow></value></block>',
      '<block type="tkinter_combobox_set_values"><value name="VALUES"><shadow type="lists_create_with"><mutation items="2"></mutation><value name="ADD0"><shadow type="text"><field name="TEXT">Yes</field></shadow></value><value name="ADD1"><shadow type="text"><field name="TEXT">No</field></shadow></value></shadow></value><value name="DEFAULT"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>',
      '<block type="tkinter_combobox_set_current"><value name="OPTION"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>',
      '<block type="tkinter_combobox_get_value"></block>',
      '<block type="tkinter_set_widget_justify"></block>',
      '<block type="tkinter_set_widget_font"><value name="FACE"><shadow type="text"><field name="TEXT">Arial</field></shadow></value><value name="SIZE"><shadow type="math_number"><field name="NUM">12</field></shadow></value></block>',
      '<block type="tkinter_set_entry_combobox_readonly"></block>',
    ],
  },
];

const dialogBlocks = [
  '<block type="tkinter_messagebox"><value name="TITLE"><shadow type="text"><field name="TEXT">Message Box</field></shadow></value><value name="TEXT"><shadow type="text"><field name="TEXT">Hello</field></shadow></value></block>',
  '<block type="tkinter_ask_dialog"><value name="TITLE"><shadow type="text"><field name="TEXT">Question</field></shadow></value><value name="TEXT"><shadow type="text"><field name="TEXT">Do you want to continue?</field></shadow></value></block>',
  '<block type="tkinter_simpledialog"><value name="TITLE"><shadow type="text"><field name="TEXT">Input</field></shadow></value><value name="PROMPT"><shadow type="text"><field name="TEXT">Enter something:</field></shadow></value></block>',
  '<block type="tkinter_filedialog"><value name="TITLE"><shadow type="text"><field name="TEXT">Select a file</field></shadow></value></block>',
  '<block type="tkinter_colorchooser"><value name="TITLE"><shadow type="text"><field name="TEXT">Choose a colour</field></shadow></value></block>',
];

function variableGetter(
  variable: Parameters<typeof Blockly.Variables.generateVariableFieldDom>[0],
  blockType: string,
): Element {
  const block = Blockly.utils.xml.createElement('block');
  block.setAttribute('type', blockType);
  block.setAttribute('gap', '8');
  block.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
  return block;
}

function registerTypedCategory(
  workspace: Blockly.WorkspaceSvg,
  spec: TypedCategory,
): void {
  const buttonCallback = `CREATE_${spec.variableType}`;
  workspace.registerButtonCallback(buttonCallback, (button) => {
    Blockly.Variables.createVariableButtonHandler(
      button.getTargetWorkspace(),
      undefined,
      spec.variableType,
    );
  });
  workspace.registerToolboxCategoryCallback(spec.callbackKey, (categoryWs) => [
    Blockly.utils.xml.textToDom(
      `<button text="${spec.buttonText}" callbackKey="${buttonCallback}"></button>`,
    ),
    ...categoryWs
      .getVariableMap()
      .getVariablesOfType(spec.variableType)
      .map((variable) =>
        variableGetter(variable, spec.getterType),
      ),
    ...spec.blocks.map(Blockly.utils.xml.textToDom),
  ]);
}

export function registerWorkspace(workspace: Blockly.WorkspaceSvg): void {
  categories.forEach((category) => registerTypedCategory(workspace, category));
  workspace.registerToolboxCategoryCallback('GUI_Dialog', () =>
    dialogBlocks.map(Blockly.utils.xml.textToDom),
  );
}

export const toolbox = [
  {
    kind: 'category',
    name: 'GUI',
    colour: '#555555',
    contents: [
      {kind: 'category', name: 'Window', colour: '#555555', custom: 'GUI_Windows'},
      {kind: 'category', name: 'Label', colour: '#555555', custom: 'GUI_Labels'},
      {kind: 'category', name: 'Button', colour: '#555555', custom: 'GUI_Buttons'},
      {kind: 'category', name: 'Entry', colour: '#555555', custom: 'GUI_Entries'},
      {kind: 'category', name: 'Message Boxes', colour: '#555555', custom: 'GUI_Dialog'},
      {kind: 'category', name: 'Combo Box', colour: '#555555', custom: 'GUI_Comboboxes'},
    ],
  },
] as Blockly.utils.toolbox.ToolboxItemInfo[];
