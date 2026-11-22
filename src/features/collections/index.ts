import type {FeatureModule} from '../types';
import {registerBlocks} from './blocks';
import {registerPython} from './python';

const variableList = {
  kind: 'block',
  type: 'variables_get',
  fields: {VAR: {name: 'list'}},
};

export const collectionsFeature: FeatureModule = {
  id: 'collections',
  registerBlocks,
  registerPython,
  toolbox: [
    {kind: 'block', type: 'lists_create_with', extraState: {itemCount: 0}},
    {kind: 'block', type: 'lists_create_with'},
    {kind: 'block', type: 'lists_repeat'},
    {kind: 'block', type: 'lists_length'},
    {kind: 'block', type: 'lists_isEmpty'},
    {kind: 'block', type: 'lists_indexOf'},
    {kind: 'block', type: 'lists_getIndex'},
    {kind: 'block', type: 'lists_setIndex'},
    {kind: 'block', type: 'lists_getSublist'},
    {kind: 'block', type: 'lists_split'},
    {kind: 'block', type: 'lists_sort'},
    {kind: 'block', type: 'lists_append', inputs: {LIST: {block: variableList}}},
    {kind: 'block', type: 'lists_remove', inputs: {LIST: {block: variableList}}},
    {kind: 'block', type: 'lists_pop', inputs: {LIST: {block: variableList}}},
    {kind: 'block', type: 'lists_shuffle', inputs: {LIST: {block: variableList}}},
  ],
};
