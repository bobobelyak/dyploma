import {createStore, applyMiddleware, compose} from 'redux';
import {createBrowserHistory} from 'history';
import thunk from 'redux-thunk';

import {api} from '../api';
import {rootReducer} from './reducers';

const extraArgument = {api};

const composeEnhancers = process.env.NODE_ENV === 'production' ?
  compose :
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (!localStorage.getItem('language')) {
  localStorage.setItem('language', 'en');
}
export const browserHistory = createBrowserHistory();

const language = localStorage.getItem('language');

const initialState = {language};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(extraArgument))),
);

export default store;
