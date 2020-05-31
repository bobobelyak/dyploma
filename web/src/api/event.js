import {get, create} from './common';

const language = localStorage.getItem('language');

export const events = {
  get: async () => get(`events?language=${language}`),
  getComing: async () => get(`events/coming?language=${language}`),
  // getSingle: async id => get(`feeds/${id}?language=${language}`),
  create: async (params, isFormData) => create('events', params, isFormData),
  // comment: async params => create('feeds/post-comment', params),
  like: async params => create('events/like', params),
  dislike: async params => create('events/dislike', params),
};
