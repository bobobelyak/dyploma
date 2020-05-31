import {navbar} from './navbar';
import {mapInstructions} from './map-instructions';

const language = localStorage.getItem('language');

export const Translations = {
  navbar: navbar[language],
  mapInstructions: mapInstructions[language],
};
