import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {placesState} from './places';
import {language} from './language';
import {map} from './map';
import {moreInfo} from './more-info';
import {auth} from './auth';
import {createRoute} from './create-route';
import {user} from './user';
import {tabs} from './tabs';
import {grid} from './grid';
import {feeds} from './feeds';
import {events} from './events';

export const rootReducer = combineReducers({
  placesState,
  language,
  form,
  map,
  moreInfo,
  authentication: auth,
  createRoute,
  user,
  tabs,
  grid,
  feeds,
  events,
});
