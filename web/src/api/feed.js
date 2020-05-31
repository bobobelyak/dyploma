import {get, create} from './common';

const language = localStorage.getItem('language');

export const feeds = {
  get: async () => get(`feeds?language=${language}`),
  getTop5: async () => get(`feeds/top-5?language=${language}`),
  getTopPrevious: async () => get(`feeds/top-previous-month?language=${language}`),
  getSingle: async id => get(`feeds/${id}?language=${language}`),
  create: async (params, isFormData) => create('feeds', params, isFormData),
  comment: async params => create('feeds/post-comment', params),
  like: async params => create('feeds/like', params),
  dislike: async params => create('feeds/dislike', params),
};
