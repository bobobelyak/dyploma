import {createReducer} from '../utils';

export const CHANGE_TOUR_TAB = 'tabs#changeToutTab';

export const setTourTab = (e, tab) => ({type: CHANGE_TOUR_TAB, tab});

export const tabs = createReducer({tourTab: 0, columnSize: {map: 8, route: 4}}, {
  [CHANGE_TOUR_TAB]: (state, action) => ({...state, tourTab: action.tab}),
});
