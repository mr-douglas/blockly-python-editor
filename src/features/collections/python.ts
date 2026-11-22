import type {Block} from 'blockly';
import {Order, type PythonGenerator} from 'blockly/python';

export function registerPython(generator: PythonGenerator): void {
  generator.forBlock.lists_shuffle = (block: Block, python) => {
    (python as any).definitions_.import_random = 'import random';
    const list = python.valueToCode(block, 'LIST', Order.NONE) || '[]';
    return `random.shuffle(${list})\n`;
  };
  generator.forBlock.lists_append = (block: Block, python) => {
    const item = python.valueToCode(block, 'ITEM', Order.NONE) || 'None';
    const list = python.valueToCode(block, 'LIST', Order.MEMBER) || '[]';
    return `${list}.append(${item})\n`;
  };
  generator.forBlock.lists_remove = (block: Block, python) => {
    const item = python.valueToCode(block, 'ITEM', Order.NONE) || 'None';
    const list = python.valueToCode(block, 'LIST', Order.MEMBER) || '[]';
    return `${list}.remove(${item})\n`;
  };
  generator.forBlock.lists_pop = (block: Block, python) => {
    const list = python.valueToCode(block, 'LIST', Order.MEMBER) || '[]';
    const at = python.valueToCode(block, 'AT', Order.NONE);
    return `${list}.pop(${at || ''})\n`;
  };
}
