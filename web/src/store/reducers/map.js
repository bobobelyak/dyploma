import {createAction, createReducer} from '../utils';

const SET_COORDINATES = 'map#setCoordinates';
const SHOW_POPUP = 'map#showPopup';

export const setCoordinates = coordinates => ({type: SET_COORDINATES, coordinates});

export const showPopup = showPopup => ({type: SHOW_POPUP, showPopup});

export const map = createReducer({coordinates: [24.03268469565475, 49.842209356240375], showPopup: {popup: false, btn: false}, map: {}}, {
  [SET_COORDINATES]: (state, action) => ({...state, coordinates: action.coordinates}),
  [SHOW_POPUP]: (state, action) => ({...state, showPopup: action.showPopup}),
});
