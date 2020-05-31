import {createAction, createReducer} from '../utils';
import {places} from '../../api/places';
import {api} from '../../api';
import {LIKE} from './comments';

const GET_PLACES = 'places#getPlaces';
const GET_SINGLE = 'places#getSingle';
const CLEAR_SINGLE = 'places#clearSingle';
const LOADING_SINGLE = 'places#loadingSingle';
const SET_PLACE = 'places#setPlace';
const CREATE_PLACE = 'places#createPlace';
const LOADING_PLACES = 'places#loadingPlaces';
const GET_PLACE_CATEGORIES = 'places#getPlaceCategories';
const GET_PLACES_SUGGESTIONS = 'suggestions#getPlaces';
const LOADING_PLACES_SUGGESTIONS = 'suggestions#loadingPlaces';
const UPDATE_PLACE = 'places#updatePlace';
const REMOVE_PLACE = 'places#removePlace';
const CONFIRM_PLACE = 'places#confirmPlace';
const COMMENT = 'places#addComment';
const SET_SEARCH_TEXT = 'places#setSearchText';
const SEARCH = 'places#search';
const LOADING_SEARCH = 'places#loadingSearch';
const GET_TOP = 'places#getTop';
const LOADING_TOP = 'places#loadingTop';
const CLEAR_CREATE_TOUR = 'places#clearCreateTour';

export const getPlacesSuggestions = createAction({fetch: GET_PLACES_SUGGESTIONS, loading: LOADING_PLACES_SUGGESTIONS}, api => api.places.getSuggestions);
export const getPlaces = createAction({fetch: GET_PLACES, loading: LOADING_PLACES}, api => api.places.get);
export const getSingle = id => createAction({fetch: GET_SINGLE, loading: LOADING_SINGLE}, api => api.places.getSingle)(id);
export const clearSingle = () => ({type: CLEAR_SINGLE});
export const getPlaceCategories = createAction({fetch: GET_PLACE_CATEGORIES}, api => api.places.getPlaceCategories);

export const setPlace = place => ({type: SET_PLACE, place});

export const createPlace = params => createAction({fetch: CREATE_PLACE}, api => api.places.create)(params);

export const updatePlace = params => createAction({fetch: UPDATE_PLACE}, api => api.places.update)(params);
export const confirmPlace = (id, callback) => async dispatch => {
  const result = await dispatch(createAction({fetch: CONFIRM_PLACE}, api => api.places.update)({_id: id, confirmed: true}));

  if (!result.error) {
    callback();
  }
};

export const removePlace = (id, callback) => async dispatch => {
  const result = await dispatch(createAction({fetch: REMOVE_PLACE}, api => api.places.remove)(id));

  if (!result.error) {
    callback();
  }
};

export const addComment = (data, callback) => async dispatch => {
  const result = await dispatch(createAction({fetch: COMMENT}, api => api.comments.add)(data));

  if (!result.error) {
    callback();
  }
};

export const setSearchText = e => ({type: SET_SEARCH_TEXT, searchString: e.target.value});
export const search = () => async (dispatch, getState) => {
  const {placesState: {searchString}} = getState();
  if (searchString.length > 0) {
    await dispatch(createAction({fetch: SEARCH, loading: LOADING_SEARCH}, api => api.places.search)(searchString));
  }
};

export const getTop = limit => createAction({fetch: GET_TOP, loading: LOADING_TOP}, api => api.places.top)(limit);

export const clearTop = () => ({type: CLEAR_CREATE_TOUR});

const initialState = {
  places: [],
  categories: [],
  place: null,
  loadingSuggestions: false,
  singlePlace: {},
  loadingSingle: false,
  searchString: '',
  searchResult: [],
  loadingSearch: false,
  triggerSearch: false,
  topPlaces: [],
  loadingTop: false,
};

export const placesState = createReducer(initialState, {
  [GET_PLACES]: (state, action) => ({...state, places: action.payload.places, loadingSuggestions: false}),
  [GET_SINGLE]: (state, action) => ({...state, singlePlace: action.payload, loadingSingle: true}),
  [CLEAR_SINGLE]: state => ({...state, singlePlace: {}, loadingSingle: false}),
  [LOADING_SINGLE]: state => ({...state, loadingSingle: false}),
  [SET_PLACE]: (state, action) => ({...state, place: action.place}),
  [CREATE_PLACE]: (state, action) => ({...state, places: [...state.places, action.payload.place]}),
  [GET_PLACE_CATEGORIES]: (state, action) => ({...state, categories: action.payload.categories}),
  [GET_PLACES_SUGGESTIONS]: (state, action) => ({...state, places: action.payload.places, loadingSuggestions: true}),
  [LOADING_PLACES_SUGGESTIONS]: state => ({...state, loadingSuggestions: false}),
  [UPDATE_PLACE]: (state, action) => ({...state, places: state.places.map(place => {
    if (place._id === action.payload.place._id) {
      return action.payload.place;
    }
    return place;
  })}),
  [REMOVE_PLACE]: (state, action) => ({...state, places: state.places.filter(place => {
    if (place._id !== action.payload.id) {
      return place;
    }
  })}),
  [CONFIRM_PLACE]: (state, action) => ({...state, places: state.places.filter(place => {
    if (place._id !== action.payload.place._id) {
      return place;
    }
  })}),
  [COMMENT]: (state, action) => ({
    ...state, singlePlace: {...state.singlePlace, comments: [action.payload, ...state.singlePlace.comments]},
  }),
  [LIKE]: (state, action) => ({
    ...state,
    ...(state.place._id === action.payload.placeId && {place: {
      ...state.place,
      likes: action.payload.likes,
      dislikes: action.payload.dislikes,
      liked: action.payload.liked,
      disliked: action.payload.disliked,
    },
    }),
    ...(state.singlePlace._id === action.payload.placeId && {singlePlace: {
      ...state.singlePlace,
      likes: action.payload.likes,
      dislikes: action.payload.dislikes,
      liked: action.payload.liked,
      disliked: action.payload.disliked,
    },
    }),
    places: state.places.map(place => {
      if (place._id === action.payload.placeId) {
        return {
          ...place,
          likes: action.payload.likes,
          dislikes: action.payload.dislikes,
          liked: action.payload.liked,
          disliked: action.payload.disliked,
        };
      }
      return place;
    }),
  }),
  [SET_SEARCH_TEXT]: (state, action) => ({...state, searchString: action.searchString}),
  [LOADING_SEARCH]: state => ({...state, loadingSearch: true}),
  [SEARCH]: (state, action) => ({...state, searchResult: action.payload.places, loadingSearch: false, triggerSearch: true}),
  [GET_TOP]: (state, action) => ({...state, topPlaces: action.payload.places, loadingTop: false}),
  [LOADING_TOP]: state => ({...state, loadingTop: true}),
  [CLEAR_CREATE_TOUR]: state => ({...state, triggerSearch: false, searchString: '', searchResult: []}),
});
