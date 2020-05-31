import {get, create} from './common';


export const auth = {
  signInFacebook: async params => create('oauth/facebook', {
    access_token: params.access_token,
  }),
};
