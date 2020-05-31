import {get, create, update, remove} from './common';

const language = localStorage.getItem('language');

export const user = {
  getLikedPlaces: async () => get(`user/liked-places?language=${language}`),
  getTours: async () => get(`user/tours?language=${language}`),
};
