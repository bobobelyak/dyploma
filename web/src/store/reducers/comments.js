import {createAction} from '../utils';

export const LIKE = 'places#like';

export const like = (data, callback) => async dispatch => {
  const result = await dispatch(createAction({fetch: LIKE}, api => api.comments.like)(data));

  if (!result.error) {
    callback();
  }
};

export const dislike = (data, callback) => async dispatch => {
  const result = await dispatch(createAction({fetch: LIKE}, api => api.comments.dislike)(data));

  if (!result.error) {
    callback();
  }
};
