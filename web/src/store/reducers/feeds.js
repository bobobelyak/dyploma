import {createAction, createReducer} from '../utils';

const GET_FEEDS = 'feeds#getFeeds';
const LOADING_FEEDS = 'feeds#loadingFeeds';
const GET_PREVIUOS_M_TOP = 'feeds#getPreviousTop';
const LOADING_PREVIOUS_M_TOP = 'feeds#loadingPreviousTop';
const GET_TOP_5_FEEDS = 'feeds#getTop5Feeds';
const LOADING_TOP_5_FEEDS = 'feeds#loadingTop5Feeds';
const GET_SINGLE_FEED = 'feeds#getSingleFeed';
const LOADING_SINGLE_FEED = 'feeds#loadingSingleFeed';
const POST_COMMENT = 'feeds#postComment';
const LIKE = 'feeds#like';

export const getFeeds = createAction({fetch: GET_FEEDS, loading: LOADING_FEEDS}, api => api.feeds.get);
export const getTopFeeds = createAction({fetch: GET_TOP_5_FEEDS, loading: LOADING_TOP_5_FEEDS}, api => api.feeds.getTop5);
export const getPreviousTopFeeds = createAction({fetch: GET_PREVIUOS_M_TOP, loading: LOADING_PREVIOUS_M_TOP}, api => api.feeds.getTopPrevious);
export const getSingleFeed = id => createAction({fetch: GET_SINGLE_FEED, loading: LOADING_SINGLE_FEED}, api => api.feeds.getSingle)(id);
export const postComment = (data, callback) => async dispatch => {
  const result = await dispatch(createAction({fetch: POST_COMMENT}, api => api.feeds.comment)(data));

  if (!result.error) {
    callback();
  }
};

export const like = (data, callback) => async dispatch => {
  const result = await dispatch(createAction({fetch: LIKE}, api => api.feeds.like)(data));

  if (!result.error) {
    callback();
  }
};

export const dislike = (data, callback) => async dispatch => {
  const result = await dispatch(createAction({fetch: LIKE}, api => api.feeds.dislike)(data));

  if (!result.error) {
    callback();
  }
};

export const feeds = createReducer({feeds: [], topFeeds: [], previousMonthFeeds: [], loadingTopFeeds: false, loadingFeeds: false, loadingPMFeeds: false, feed: {comments: []}, loadingSingle: false}, {
  [GET_FEEDS]: (state, action) => ({...state, feeds: action.payload.feeds, loadingFeeds: true}),
  [LOADING_FEEDS]: state => ({...state, loadingFeeds: false}),
  [GET_PREVIUOS_M_TOP]: (state, action) => ({...state, previousMonthFeeds: action.payload.feeds, loadingPMFeeds: true}),
  [LOADING_PREVIOUS_M_TOP]: state => ({...state, loadingPMFeeds: false}),
  [GET_TOP_5_FEEDS]: (state, action) => ({...state, topFeeds: action.payload.feeds, loadingTopFeeds: true}),
  [LOADING_TOP_5_FEEDS]: state => ({...state, loadingTopFeeds: false}),
  [GET_SINGLE_FEED]: (state, action) => ({...state, feed: action.payload.feed, loadingSingle: true}),
  [LOADING_FEEDS]: state => ({...state, loadingSingle: false}),
  [POST_COMMENT]: (state, action) => ({...state, feed: {...state.feed, comments: [...state.feed.comments, action.payload]}}),
  [LIKE]: (state, action) => ({
    ...state,
    ...(state.feed._id === action.payload.feedId && {feed: {
      ...state.feed,
      likes: action.payload.likes,
      dislikes: action.payload.dislikes,
      liked: action.payload.liked,
      disliked: action.payload.disliked,
    },
    }),
    feeds: state.feeds.map(feed => {
      if (feed._id === action.payload.feedId) {
        return {
          ...feed,
          likes: action.payload.likes,
          dislikes: action.payload.dislikes,
          liked: action.payload.liked,
          disliked: action.payload.disliked,
        };
      }
      return feed;
    }),
    topFeeds: state.topFeeds.map(feed => {
      if (feed._id === action.payload.feedId) {
        return {
          ...feed,
          likes: action.payload.likes,
          dislikes: action.payload.dislikes,
          liked: action.payload.liked,
          disliked: action.payload.disliked,
        };
      }
      return feed;
    }),
  }),
});
