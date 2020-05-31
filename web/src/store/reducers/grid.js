import {createReducer} from '../utils';

const SET_COLUMN_SIZE = 'grid#setColumnSize';

export const setColumnSize = size => ({type: SET_COLUMN_SIZE, size});

export const grid = createReducer({columnSize: {map: 8, route: 4}}, {
  [SET_COLUMN_SIZE]: (state, action) => ({...state, columnSize: action.size}),
});
