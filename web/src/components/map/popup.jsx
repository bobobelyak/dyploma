import React from 'react';
import {connect} from 'react-redux';
import {compose, lifecycle, withState, withHandlers} from 'recompose';
import Avatar from '@material-ui/core/Avatar';
import {Popup} from 'react-mapbox-gl';
import {withMap} from 'react-mapbox-gl/lib-esm/context';
import {withRouter} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typograpahy from '@material-ui/core/Typography';
import Typography from '@material-ui/core/Typography/Typography';
import {setPlace} from '../../store/reducers/create-route';
import {setCoordinates} from '../../store/reducers/map';
import {toggleMoreInfo} from '../../store/reducers/more-info';
import {addRoute} from './add-route';

const PopupButton = ({text, onClick}) => (
  <Button
    onClick={onClick}
    size="small" variant="contained" color="primary"
    className="popup-button"
  >
    {text}
  </Button>
);

const PopupComponent = props => {
  const {place, map, setPlace, routeList, showButton, history, toggleMoreInfo} = props;

  const goToMoreInfo = place => e => {
    e.stopPropagation();
    toggleMoreInfo();
    history.push(`/place/${place._id}`);
  };

  return (
    <Popup
      coordinates={[place.longitude, place.latitude]}
      offset={{
        'bottom-left': [12, -38], bottom: [0, -5], 'bottom-right': [-12, -38],
      }}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Avatar onClick={goToMoreInfo(place)} className="popup-image" src={place.imgUrl}/>
        <Typograpahy variant="h2" style={{fontSize: '1.5em', marginTop: 3}}>{place.name || place.en.name}</Typograpahy>
        {
          showButton && (
            routeList.length === 0 ? <PopupButton onClick={() => setPlace(place)} text="Start"/> :
              (routeList.some(item => item._id === place._id) ? null :
              <PopupButton
                  onClick={() => addRoute(map, place, [routeList[routeList.length - 1].longitude, routeList[routeList.length - 1].latitude], [place.longitude, place.latitude], setPlace, routeList)}
                  text="Add"
                />
              ))
        }
      </Grid>
    </Popup>
  );
};

const mapStateToProps = state => ({
  routeList: state.createRoute.routeList,
  place: state.placesState.place,
});

export default compose(
  withMap,
  withRouter,
  connect(mapStateToProps, {setPlace, setCoordinates, toggleMoreInfo}),
  lifecycle({
    componentDidMount() {
      const {setCoordinates, place} = this.props;
      setCoordinates([place.longitude, place.latitude]);
    },

  }),
)(PopupComponent);
