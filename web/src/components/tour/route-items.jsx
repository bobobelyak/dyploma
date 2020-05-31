import React from 'react';
import {connect} from 'react-redux';
import {compose, withState, withHandlers} from 'recompose';
import {withRouter} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {setCoordinates, showPopup} from '../../store/reducers/map';
import {setPlace} from '../../store/reducers/places';
import CreateDialog from './create-dialog';

const RouteItem = ({place, index, setCenter, length, toggleCreate, pathname}) => (
  <Grid style={{marginTop: 90 * index}} container className="place-list-container">
    { index !== 0 && <span className="distance-span">{place.distance} m</span>}
    <Avatar onClick={setCenter(place)} src={place.imgUrl} className="place-avatar"/>
    { pathname === '/create-tour' && index === length - 1 && length >= 2 && <Button onClick={toggleCreate} size="small" className="create-button" color="primary" variant="contained">Create</Button>}
    <div style={{marginLeft: 5}}>
      <Typography variant="h2" gutterBottom style={{fontSize: place.name.length > 10 ? '1em' : '1.2em', marginBottom: 5, marginTop: 10}}>
        {place.name}
      </Typography>
      <Typography variant="h2" gutterBottom style={{fontSize: place.name.length > 10 ? '0.5em' : '0.7em', color: '#898989'}}>
        {place.street}, {place.buildingNumber}
      </Typography>
    </div>
  </Grid>
);

const RouteItems = props => {
  const {places, setPlace, setCoordinates, showPopup, openCreate, toggleCreate, user, location} = props;

  const setCenter = place => e => {
    setCoordinates([place.longitude, place.latitude]);
    setPlace(place);
    showPopup({popup: true, btn: true});
  };

  return (
    <React.Fragment>
      {
        openCreate && <CreateDialog size={user.role === 'admin' || user.role === 'manager' ? 'sm' : 'xs'} open={openCreate} onClose={toggleCreate}/>
      }
        {
          places.map((place, i) => (
            <RouteItem
              key={place._id}
              toggleCreate={toggleCreate}
              setCenter={setCenter}
              index={i}
              place={place}
              length={places.length}
              pathname={location.pathname}
            />
          ))
        }
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.authentication.user,
  places: state.createRoute.routeList,
});

export default compose(
  connect(mapStateToProps, {setCoordinates, setPlace, showPopup}),
  withRouter,
  withState('openCreate', 'toggleCreate', false),
  withHandlers({
    toggleCreate: ({toggleCreate, openCreate}) => () => toggleCreate(!openCreate),
  }),
)(RouteItems);
