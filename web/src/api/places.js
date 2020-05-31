import {get, create, update, remove} from './common';

const language = localStorage.getItem('language');

export const places = {
  get: async () => get(`places?language=${language}`),
  getSuggestions: async () => get(`places/suggestions?language=${language}`),
  create: async (params, isFormData) => create('places', params, isFormData),
  getPlaceCategories: async () => get('place-categories'),
  update: async params => update(`places/${params._id}`, params),
  remove: async id => remove(`places/${id}`),
  getSingle: async id => get(`places/${id}?language=${language}`),
  search: async searchString => get(`places/search?searchString=${searchString}&language=${language}`),
  top: async limit => get(`places/top?language=${language}&limit=${limit}`),
};
