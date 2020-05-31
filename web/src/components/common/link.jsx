import React from 'react';
import {Route, Link as RouterLink, withRouter} from 'react-router-dom';

const Link = ({to, location, children, staticContext, match, history, ...rest}) => (
  <Route
    render={() => (
      <RouterLink
        replace={to === location.pathname}
        to={to}
        {...rest}
      >
        {children}
      </RouterLink>
    )}
  />
);

export default withRouter(Link);
