import type {FeatureModule} from './types';
import {buildHatFeature} from './buildhat';
import {collectionsFeature} from './collections';
import {customCodeFeature} from './custom-code';
import {dataTypesFeature} from './data-types';
import {errorsFeature} from './errors';
import {gpiozeroFeature} from './gpiozero';
import {legacyEv3Feature} from './legacy-ev3';
import {mathExtrasFeature} from './math-extras';
import {procedureReferenceFeature} from './procedure-reference';
import {textExtrasFeature} from './text-extras';
import {timeFeature} from './time';
import {tkinterFeature} from './tkinter';
import {turtleFeature} from './turtle';

/**
 * Explicit feature composition is the single source of truth for the app.
 * Legacy EV3 remains enabled for existing users, but isolated from supported
 * features so it can be removed from a future deployment without touching core.
 */
export const features: FeatureModule[] = [
  mathExtrasFeature,
  textExtrasFeature,
  collectionsFeature,
  errorsFeature,
  procedureReferenceFeature,
  dataTypesFeature,
  timeFeature,
  turtleFeature,
  tkinterFeature,
  legacyEv3Feature,
  buildHatFeature,
  gpiozeroFeature,
  customCodeFeature,
];

export {
  buildHatFeature,
  collectionsFeature,
  customCodeFeature,
  dataTypesFeature,
  errorsFeature,
  gpiozeroFeature,
  legacyEv3Feature,
  mathExtrasFeature,
  procedureReferenceFeature,
  textExtrasFeature,
  timeFeature,
  tkinterFeature,
  turtleFeature,
};
