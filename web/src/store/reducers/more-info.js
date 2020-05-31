import {createReducer} from '../utils';

const TOGGLE_MORE_INFO = 'TOGGLE_MORE_INFO';

export const toggleMoreInfo = () => ({type: TOGGLE_MORE_INFO});

export const moreInfo = createReducer({isMoreInfoModal: false}, {
  [TOGGLE_MORE_INFO]: state => ({...state, isMoreInfoModal: !state.isMoreInfoModal}),
},
);
