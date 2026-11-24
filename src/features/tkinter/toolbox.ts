import * as Blockly from 'blockly';
import {
  block,
  numberShadow,
  shadow,
  textShadow,
} from '../../toolbox/builders';
import {
  registerTypedVariableCategory,
  type TypedVariableCategoryConfig,
} from '../../toolbox/typed-variable-category';

type FlyoutItem = Blockly.utils.toolbox.FlyoutItemInfo;

const widgetFont = () =>
  block('tkinter_set_widget_font', {
    inputs: {
      FACE: textShadow('Arial'),
      SIZE: numberShadow(12),
    },
  });

const windowBlocks: FlyoutItem[] = [
  block('tkinter_set_window_as_root'),
  block('tkinter_set_additional_window'),
  block('tkinter_window_mainloop'),
  block('tkinter_window_set_title', {
    inputs: {TITLE: textShadow('My Window')},
  }),
  block('tkinter_window_set_dimensions', {
    inputs: {
      WIDTH: numberShadow(400),
      HEIGHT: numberShadow(400),
    },
  }),
  block('tkinter_window_set_resizable'),
  block('tkinter_window_after', {inputs: {TIME: numberShadow(1)}}),
  block('tkinter_window_set_close_command'),
  block('tkinter_window_destroy'),
];

const labelBlocks: FlyoutItem[] = [
  block('tkinter_add_widget_to_window'),
  block('tkinter_set_widget_text', {inputs: {TEXT: textShadow('abc')}}),
  block('tkinter_set_widget_width', {inputs: {WIDTH: numberShadow(20)}}),
  block('tkinter_set_widget_justify'),
  widgetFont(),
  block('tkinter_set_label_wraplength', {
    inputs: {WRAPLENGTH: numberShadow(200)},
  }),
  block('tkinter_set_label_image', {
    inputs: {FILE: textShadow('image.png')},
  }),
  block('tkinter_set_label_image_pillow', {
    inputs: {FILE: textShadow('image.jpg')},
  }),
];

function buttonBlocks(workspace: Blockly.WorkspaceSvg): FlyoutItem[] {
  const [proceduresWithoutReturn] = Blockly.Procedures.allProcedures(workspace);
  const procedureCommands = proceduresWithoutReturn.map(([name]) =>
    block('tkinter_set_button_command', {
      gap: 8,
      inputs: {
        COMMAND: shadow('procedures_get_name', {fields: {NAME: name}}),
      },
    }),
  );

  return [
    block('tkinter_add_widget_to_window'),
    block('tkinter_set_widget_text', {
      inputs: {TEXT: textShadow('Click here')},
    }),
    ...procedureCommands,
    block('tkinter_set_button_command'),
    block('tkinter_set_widget_width', {inputs: {WIDTH: numberShadow(20)}}),
    block('tkinter_button_set_enabled'),
  ];
}

const entryBlocks: FlyoutItem[] = [
  block('tkinter_add_widget_to_window'),
  block('tkinter_set_widget_width', {inputs: {WIDTH: numberShadow(20)}}),
  block('tkinter_entry_get_text'),
  block('tkinter_entry_insert_at_end', {
    inputs: {TEXT: textShadow('abc')},
  }),
  block('tkinter_entry_delete_from_start'),
  block('tkinter_set_widget_justify'),
  widgetFont(),
  block('tkinter_set_entry_combobox_readonly'),
];

const comboBoxBlocks: FlyoutItem[] = [
  block('tkinter_add_widget_to_window'),
  block('tkinter_set_widget_width', {inputs: {WIDTH: numberShadow(20)}}),
  block('tkinter_combobox_set_values', {
    inputs: {
      VALUES: shadow('lists_create_with', {
        extraState: {itemCount: 2},
        inputs: {
          ADD0: textShadow('Yes'),
          ADD1: textShadow('No'),
        },
      }),
      DEFAULT: numberShadow(0),
    },
  }),
  block('tkinter_combobox_set_current', {
    inputs: {OPTION: numberShadow(1)},
  }),
  block('tkinter_combobox_get_value'),
  block('tkinter_set_widget_justify'),
  widgetFont(),
  block('tkinter_set_entry_combobox_readonly'),
];

const categories: TypedVariableCategoryConfig[] = [
  {
    callbackKey: 'GUI_Windows',
    createButtonText: 'Create window...',
    variableType: 'GUI_Window',
    getterBlockType: 'tkinter_variables_get_window',
    extraBlocks: windowBlocks,
  },
  {
    callbackKey: 'GUI_Labels',
    createButtonText: 'Create label...',
    variableType: 'GUI_Label',
    getterBlockType: 'tkinter_variables_get_label',
    extraBlocks: labelBlocks,
  },
  {
    callbackKey: 'GUI_Buttons',
    createButtonText: 'Create button...',
    variableType: 'GUI_Button',
    getterBlockType: 'tkinter_variables_get_button',
    extraBlocks: buttonBlocks,
  },
  {
    callbackKey: 'GUI_Entries',
    createButtonText: 'Create entry...',
    variableType: 'GUI_Entry',
    getterBlockType: 'tkinter_variables_get_entry',
    extraBlocks: entryBlocks,
  },
  {
    callbackKey: 'GUI_Comboboxes',
    createButtonText: 'Create combobox...',
    variableType: 'GUI_Combobox',
    getterBlockType: 'tkinter_variables_get_combobox',
    extraBlocks: comboBoxBlocks,
  },
];

const dialogBlocks: FlyoutItem[] = [
  block('tkinter_messagebox', {
    inputs: {
      TITLE: textShadow('Message Box'),
      TEXT: textShadow('Hello'),
    },
  }),
  block('tkinter_ask_dialog', {
    inputs: {
      TITLE: textShadow('Question'),
      TEXT: textShadow('Do you want to continue?'),
    },
  }),
  block('tkinter_simpledialog', {
    inputs: {
      TITLE: textShadow('Input'),
      PROMPT: textShadow('Enter something:'),
    },
  }),
  block('tkinter_filedialog', {
    inputs: {TITLE: textShadow('Select a file')},
  }),
  block('tkinter_colorchooser', {
    inputs: {TITLE: textShadow('Choose a colour')},
  }),
];

export function registerWorkspace(workspace: Blockly.WorkspaceSvg): void {
  categories.forEach((category) =>
    registerTypedVariableCategory(workspace, category),
  );
  workspace.registerToolboxCategoryCallback('GUI_Dialog', () => dialogBlocks);
}

export const toolbox = [
  {
    kind: 'category',
    name: 'GUI',
    colour: '#555555',
    contents: [
      {
        kind: 'category',
        name: 'Window',
        colour: '#555555',
        custom: 'GUI_Windows',
      },
      {
        kind: 'category',
        name: 'Label',
        colour: '#555555',
        custom: 'GUI_Labels',
      },
      {
        kind: 'category',
        name: 'Button',
        colour: '#555555',
        custom: 'GUI_Buttons',
      },
      {
        kind: 'category',
        name: 'Entry',
        colour: '#555555',
        custom: 'GUI_Entries',
      },
      {
        kind: 'category',
        name: 'Message Boxes',
        colour: '#555555',
        custom: 'GUI_Dialog',
      },
      {
        kind: 'category',
        name: 'Combo Box',
        colour: '#555555',
        custom: 'GUI_Comboboxes',
      },
    ],
  },
] as Blockly.utils.toolbox.ToolboxItemInfo[];
