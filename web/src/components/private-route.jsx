import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthService} from '../helpers/auth-service';

const PrivateRoute = props => {
  const {component: Component, secured, path, exact} = props;
  return (
    <Route
      path={path}
      exact={exact}
      render={prop =>
        secured ? (
          AuthService.tokenExists() ? (
            <Component {...prop}/>
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: {from: prop.location},
              }}
            />)
        ) : <Component {...prop}/>
      }
    />
  );
};

export default PrivateRoute;
