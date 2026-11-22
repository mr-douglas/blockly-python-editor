/**
 * Compatibility helpers for migrating the original Blockly 5 extensions.
 *
 * Keep all version-specific aliases here. Feature modules should otherwise use
 * normal Blockly APIs, which makes removing this bridge incremental and keeps
 * upstream upgrades isolated to one small module.
 */

import * as Blockly from 'blockly';
import {FieldAngle} from '@blockly/field-angle';
import {FieldColour} from '@blockly/field-colour';
import type {PythonGenerator} from 'blockly/python';

type LegacyBlockly = typeof Blockly & {
  ALIGN_RIGHT: Blockly.inputs.Align;
  Constants: Record<string, unknown>;
  FieldAngle: typeof FieldAngle;
  FieldColour: typeof FieldColour;
  Python?: LegacyPythonGenerator;
  inputTypes: typeof Blockly.inputs.inputTypes;
};

export type LegacyPythonGenerator = PythonGenerator & {
  variableDB_: PythonGenerator['nameDB_'];
  [key: string]: unknown;
};

/** Blockly namespace with aliases used by the original extension files. */
export const legacyBlockly = Object.assign({}, Blockly, {
  ALIGN_RIGHT: Blockly.inputs.Align.RIGHT,
  Constants: Object.create(null),
  FieldAngle,
  FieldColour,
  inputTypes: Blockly.inputs.inputTypes,
}) as LegacyBlockly;

/**
 * Creates a facade that registers legacy `Blockly.Python[type] = fn` handlers
 * through the modern `generator.forBlock` API.
 */
export function createLegacyPythonFacade(
  generator: PythonGenerator,
): LegacyPythonGenerator {
  const target = generator as LegacyPythonGenerator;
  return new Proxy(target, {
    get(object, property, receiver) {
      if (property === 'variableDB_') return object.nameDB_;
      if (
        typeof property === 'string' &&
        Object.prototype.hasOwnProperty.call(object.forBlock, property)
      ) {
        return object.forBlock[property];
      }
      return Reflect.get(object, property, receiver);
    },
    set(object, property, value, receiver) {
      if (
        typeof property === 'string' &&
        typeof value === 'function' &&
        !(property in object)
      ) {
        object.forBlock[property] = value;
        return true;
      }
      return Reflect.set(object, property, value, receiver);
    },
  });
}

/** Creates the namespace used inside one migrated Python generator module. */
export function legacyBlocklyWithPython(generator: PythonGenerator) {
  return Object.assign({}, legacyBlockly, {
    Python: createLegacyPythonFacade(generator),
  }) as LegacyBlockly & {Python: LegacyPythonGenerator};
}
