import {createReducer} from '../utils';

const SET_LANGUAGE = 'setLanguage';

export const setLanguage = language => ({type: SET_LANGUAGE, language});

export const language = createReducer({}, {
  [SET_LANGUAGE]: (state, action) => action.language,
});
