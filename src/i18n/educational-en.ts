import * as En from 'blockly/msg/en';

/** Intentional teaching-language differences from Blockly's English locale. */
export const educationalEnglish: Record<string, string> = {
  ...(En as unknown as Record<string, string>),
  LOGIC_NULL: 'None/null',
  TEXT_PROMPT_TYPE_TEXT: 'get text input from user with message',
  TEXT_PROMPT_TYPE_NUMBER: 'get number input from user with message',
  TEXT_PROMPT_TYPE_INTEGER: 'get integer input from user with message',
};
