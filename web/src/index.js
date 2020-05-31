import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import '@babel/polyfill';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/configureStore';
import Layout from './components/app';
import {SnackBarProvider} from './context/snack-bar-context';

import 'mapbox-gl/src/css/mapbox-gl.css';
import 'react-vertical-timeline-component/style.min.css';
import 'react-quill/dist/quill.snow.css';
import './styles/app.css';

ReactDOM.render(
  <Provider store={store}>
    <SnackBarProvider>
      <Router>
        <Layout/>
      </Router>
    </SnackBarProvider>
  </Provider>
  , document.getElementById('root'));
