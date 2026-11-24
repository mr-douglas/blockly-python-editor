import type {FeatureModule} from '../types';
import {
  block,
  numberShadow,
  textShadow,
  variableBlock,
} from '../../toolbox/builders';
import {registerBlocks} from './blocks';
import {registerPython} from './python';

export const collectionsFeature: FeatureModule = {
  id: 'collections',
  registerBlocks,
  registerPython,
  toolbox: [
    block('lists_create_with', {extraState: {itemCount: 0}}),
    block('lists_create_with'),
    block('lists_repeat', {inputs: {NUM: numberShadow(5)}}),
    block('lists_length'),
    block('lists_isEmpty'),
    block('lists_indexOf', {inputs: {VALUE: variableBlock('list')}}),
    block('lists_getIndex', {inputs: {VALUE: variableBlock('list')}}),
    block('lists_setIndex', {inputs: {LIST: variableBlock('list')}}),
    block('lists_getSublist', {inputs: {LIST: variableBlock('list')}}),
    block('lists_split', {inputs: {DELIM: textShadow(',')}}),
    block('lists_sort'),
    block('lists_append', {
      inputs: {ITEM: textShadow('item'), LIST: variableBlock('list')},
    }),
    block('lists_remove', {
      inputs: {ITEM: textShadow('item'), LIST: variableBlock('list')},
    }),
    block('lists_pop', {
      inputs: {LIST: variableBlock('list'), AT: numberShadow(0)},
    }),
    block('lists_shuffle', {inputs: {LIST: variableBlock('list')}}),
  ],
};
