import {createAction, createReducer} from '../utils';

const GET_LIKED_PLACES = 'user#getLikedPlaces';
const LOADING_LIKED_PLACES = 'user#loadingLikePlaced';
const GET_TOURS = 'user#getTours';
const LOADING_TOURS = 'user#loadingTourd';

export const getLikedPlaces = createAction({fetch: GET_LIKED_PLACES, loading: LOADING_LIKED_PLACES}, api => api.user.getLikedPlaces);
export const getTours = createAction({fetch: GET_TOURS, loading: LOADING_TOURS}, api => api.user.getTours);

export const user = createReducer({likedPlaces: [], tours: [], loadingTours: false, loadingPlaces: false}, {
  [GET_LIKED_PLACES]: (state, action) => ({...state, likedPlaces: action.payload.likedPlaces, loadingPlaces: true}),
  [LOADING_LIKED_PLACES]: state => ({...state, loadingPlaces: false}),
  [GET_TOURS]: (state, action) => ({...state, tours: action.payload.tours, loadingTours: true}),
  [LOADING_TOURS]: state => ({...state, loadingTours: false}),
});
