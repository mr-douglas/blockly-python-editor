import * as Blockly from 'blockly';
import {block, category, textShadow, variableBlock} from '../builders';

const colour = String(Blockly.Msg.TEXTS_HUE ?? 160);

export const ioCategory = category('Input/Output', colour, [
  block('text_print', {inputs: {TEXT: textShadow('abc')}}),
  block('text_prompt_ext', {inputs: {TEXT: textShadow('abc')}}),
]);

export const stringsCategory = category('Strings (Text)', colour, [
  block('text'),
  block('text_join'),
  block('text_append', {inputs: {TEXT: textShadow()}}),
  block('text_length', {inputs: {VALUE: textShadow('abc')}}),
  block('text_isEmpty', {inputs: {VALUE: textShadow()}}),
  block('text_indexOf', {
    inputs: {VALUE: variableBlock('text'), FIND: textShadow('abc')},
  }),
  block('text_charAt', {inputs: {VALUE: variableBlock('text')}}),
  block('text_getSubstring', {inputs: {STRING: variableBlock('text')}}),
  block('text_changeCase', {inputs: {TEXT: textShadow('abc')}}),
  block('text_trim', {inputs: {TEXT: textShadow('abc')}}),
  block('text_reverse'),
  block('text_newline'),
]);
