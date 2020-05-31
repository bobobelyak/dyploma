import {createAction, createReducer} from '../utils';
import {CHANGE_TOUR_TAB} from './tabs';

const SET_PLACE = 'createRoute#setPlace';
const CLEAR = 'createRoute#clear';
const SET_TOUR = 'createRoute#setTour';
const SET_TOUR_DESCRIPTION = 'createRoute#setDescription';
const GET_TOURS = 'createRoute#getTours';
const LOADING_TOUR = 'createRoute#loadingTour';

export const setPlace = place => ({type: SET_PLACE, place});
export const clearRoutes = () => ({type: CLEAR});
export const setTour = (tour, tourId) => ({type: SET_TOUR, tour, tourId});
export const setTourDescription = (routeId, language, description) => ({type: SET_TOUR_DESCRIPTION, routeId, language, description});
export const getTours = createAction({fetch: GET_TOURS, loading: LOADING_TOUR}, api => api.tours.get);

export const createRoute = createReducer({routeList: [], name: '', tours: [], loadingTours: false}, {
  [SET_PLACE]: (state, action) => ({...state, routeList: [...state.routeList, action.place]}),
  [CLEAR]: state => ({...state, routeList: []}),
  [SET_TOUR]: (state, action) => ({...state, routeList: action.tour, tourId: action.tourId}),
  [CHANGE_TOUR_TAB]: state => ({...state, routeList: [], tourId: ''}),
  [SET_TOUR_DESCRIPTION]: (state, action) => ({...state, routeList: state.routeList.map(route => {
    if (route._id === action.routeId) {
      return {
        ...route,
        placeDescription: {...route.placeDescription, [action.language]: action.description},
      };
    }
    return route;
  })}),
  [GET_TOURS]: (state, action) => ({...state, tours: action.payload.tours, loadingTours: true}),
  [LOADING_TOUR]: state => ({...state, loadingTours: false}),
});
