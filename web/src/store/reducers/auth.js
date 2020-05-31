import {createAction, createReducer} from '../utils';
import {AuthService} from '../../helpers/auth-service';
import {getPlaces, setPlace, getSingle} from "./places";

const AUTH_FACEBOOK = 'auth#facebook';
const SET_USER_DATA = 'auth#setUserData';

export const signInFacebook = (params, callback) => async (dispatch, getState) => {
  const result = await dispatch(createAction({fetch: AUTH_FACEBOOK}, api => api.auth.signInFacebook)(params));

  if (!result.error) {
    AuthService.setToken(result.payload.token);
    dispatch({type: SET_USER_DATA, user: AuthService.decodeToken()});
    dispatch(setPlace(null));
    dispatch(getPlaces());
    callback();
  }
};

export const auth = createReducer({user: AuthService.tokenExists() ? AuthService.decodeToken() : null}, {
  [SET_USER_DATA]: (state, action) => ({...state, user: action.user}),
});
