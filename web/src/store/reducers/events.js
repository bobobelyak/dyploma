import {createAction, createReducer} from '../utils';

const GET_EVENTS = 'events#getEvents';
const LOADING_EVENTS = 'events#loadingEvents';
const GET_COMING_EVENTS = 'events#getComingEvents';
const LOADING_COMING_EVENTS = 'feeds#loadingComingEvents';

// const GET_SINGLE_FEED = 'feeds#getSingleFeed';
// const LOADING_SINGLE_FEED = 'feeds#loadingSingleFeed';
// const POST_COMMENT = 'feeds#postComment';
const LIKE = 'events#like';

export const getEvents = createAction({fetch: GET_EVENTS, loading: LOADING_EVENTS}, api => api.events.get);
export const getComing = createAction({fetch: GET_COMING_EVENTS, loading: LOADING_COMING_EVENTS}, api => api.events.getComing);
// export const getPreviousTopFeeds = createAction({fetch: GET_PREVIUOS_M_TOP, loading: LOADING_PREVIOUS_M_TOP}, api => api.feeds.getTopPrevious);
// export const getSingleFeed = id => createAction({fetch: GET_SINGLE_FEED, loading: LOADING_SINGLE_FEED}, api => api.feeds.getSingle)(id);
// export const postComment = (data, callback) => async dispatch => {
//   const result = await dispatch(createAction({fetch: POST_COMMENT}, api => api.feeds.comment)(data));
//
//   if (!result.error) {
//     callback();
//   }
// };

export const like = (data, callback) => async dispatch => {
  const result = await dispatch(createAction({fetch: LIKE}, api => api.events.like)(data));

  if (!result.error) {
    callback();
  }
};

export const dislike = (data, callback) => async dispatch => {
  const result = await dispatch(createAction({fetch: LIKE}, api => api.events.dislike)(data));

  if (!result.error) {
    callback();
  }
};

export const events = createReducer({events: [], comingEvents: [], loadingEvents: false, loadingComingEvents: false}, {
  [GET_EVENTS]: (state, action) => ({...state, events: action.payload.events, loadingEvents: true}),
  [LOADING_EVENTS]: state => ({...state, loadingEvents: false}),
  [GET_COMING_EVENTS]: (state, action) => ({...state, comingEvents: action.payload.comingEvents, loadingComingEvents: true}),
  [LOADING_COMING_EVENTS]: state => ({...state, loadingComingEvents: false}),
  // [GET_TOP_5_FEEDS]: (state, action) => ({...state, topFeeds: action.payload.feeds, loadingTopFeeds: true}),
  // [LOADING_TOP_5_FEEDS]: state => ({...state, loadingTopFeeds: false}),
  // [GET_SINGLE_FEED]: (state, action) => ({...state, feed: action.payload.feed, loadingSingle: true}),
  // [LOADING_FEEDS]: state => ({...state, loadingSingle: false}),
  // [POST_COMMENT]: (state, action) => ({...state, feed: {...state.feed, comments: [...state.feed.comments, action.payload]}}),
  [LIKE]: (state, action) => ({
    ...state,
    events: state.events.map(event => {
      if (event._id === action.payload.eventId) {
        return {
          ...event,
          likes: action.payload.likes,
          dislikes: action.payload.dislikes,
          liked: action.payload.liked,
          disliked: action.payload.disliked,
        };
      }
      return event;
    }),
  }),
});
