import {get, create, update, remove} from './common';


export const comments = {
  add: async params => create('places/post-comment', {
    placeId: params.placeId,
    text: params.text,
  }),
  like: async params => update('places/like', {
    placeId: params.placeId,
  }),
  dislike: async params => update('places/dislike', {
    placeId: params.placeId,
  }),
};
