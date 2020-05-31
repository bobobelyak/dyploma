import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle} from 'recompose';
import {withMap} from 'react-mapbox-gl/lib-esm/context';
import {showPopup} from '../../store/reducers/map';
import {clearRoutes} from '../../store/reducers/create-route';
import {addExisting} from './add-route';

const Configuration = props => {
  const {} = props;

  return null;
};

const mapStateToProps = state => ({
  routes: state.createRoute.routeList,
});

export default compose(
  connect(mapStateToProps, {showPopup, clearRoutes}),
  withMap,
  lifecycle({
    componentDidUpdate(prevProps) {
      const {location, map, routes, showPopup, clearRoutes} = this.props;

      if (location.pathname !== prevProps.location.pathname && location.pathname.split('/')[1] !== 'place') {
        showPopup({popup: false, btn: false});
      }

      if (location.pathname !== prevProps.location.pathname && prevProps.location.pathname.split('/')[1] === 'place' && location.pathname !== '/create-tour') {
        showPopup({popup: true, btn: false});
      }

      if (location.pathname !== prevProps.location.pathname && prevProps.location.pathname.split('/')[1] === 'place' && location.pathname === '/create-tour') {
        showPopup({popup: true, btn: true});
      }

      if (routes.length !== prevProps.routes.length) {
        prevProps.routes.forEach(route => {
          if (map.getLayer(route._id + 'route')) {
            map.removeLayer(route._id + 'route');
            map.removeSource(route._id + 'route');
          }
        });
        addExisting(map, routes);
      }

      if (location.pathname !== prevProps.location.pathname && (prevProps.location.pathname === '/tours' || prevProps.location.pathname === '/create-tour')) {
        clearRoutes();
        routes.forEach(route => {
          if (map.getLayer(route._id + 'route')) {
            map.removeLayer(route._id + 'route');
            map.removeSource(route._id + 'route');
          }
        });
      }
    },
  }),
)(Configuration);
