import {get, create, update, remove} from './common';

const language = localStorage.getItem('language');

export const tours = {
  create: async params => create('user/create-tour', {
    name: params.name,
    routes: params.routeList,
    type: params.type,
    price: params.price,
    tourDescription: params.tourDescription,
    contactPhone: params.contactPhone,
    contactUrl: params.contactUrl,
  }),
  get: async type => get(`tours?language=${language}&type=${type}`),
};
