import React, {Suspense} from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle, withHandlers, withState} from 'recompose';
import {withRouter, Switch, Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import {routes} from '../routes';
import {setColumnSize} from '../store/reducers/grid';
import {SnackBarContext} from '../context/snack-bar-context';
import Map from './map';
import NavBar from './layout/nav-bar';
import PrivateRoute from './private-route';

class SnackBar extends React.Component {
  render = () => {
    const {
      isOpenSnackBar,
      closeSnackBar,
      snackType,
      snackMessage,
    } = this.context;

    return (
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        open={isOpenSnackBar}
        onClose={closeSnackBar}
        id="snack-bar-notification"
        className={snackType}
        message={snackMessage}
        autoHideDuration={5000}
      />
    );
  }
}

SnackBar.contextType = SnackBarContext;

const Layout = props => {
  const {
    columnSize,
  } = props;

  return (
    <div className="root">
      <NavBar/>
      {/* <div style={{flexGrow: 1, height: '100%'}}> */}
      <Grid container style={{height: '100%'}}>
        {
          console.log(columnSize)
        }
        <Grid item md={columnSize.map}>
          <Map/>
        </Grid>
        <Grid item md={columnSize.route}>
          <Suspense fallback="">
            <Switch>
              {
                routes.map(route => (
                  <PrivateRoute
                    key={route.path}
                    secured={route.secured}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}/>
                ))
              }
              <Redirect from="*" to="/"/>
            </Switch>
          </Suspense>
        </Grid>
      </Grid>
      <SnackBar/>
      {/* </div> */}
    </div>
  );
};

const setColumns = (pathname, changeFunction) => {
  switch (pathname) {
    case '/create-place':
      changeFunction({map: 7, route: 5});
      break;
    case '/tours':
      changeFunction({map: 6, route: 6});
      break;
    case '/create-tour':
      changeFunction({map: 6, route: 6});
      break;
    default:
      changeFunction({map: 8, route: 4});
      break;
  }
};

const mapStateToProps = state => ({
  places: state.placesState.places,
  columnSize: state.grid.columnSize,
});

export default compose(
  withRouter,
  connect(mapStateToProps, {setColumnSize}),
  lifecycle({
    componentWillUpdate(nextProps) {
      const {location, setColumnSize} = this.props;
      if (location.pathname !== nextProps.location.pathname) {
        setColumns(nextProps.location.pathname, setColumnSize);
      }
    },
    componentDidMount() {
      const {location, setColumnSize} = this.props;
      setColumns(location.pathname, setColumnSize);
    },
  }),
)(Layout);
