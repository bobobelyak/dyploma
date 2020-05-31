import React from 'react';
import {connect} from 'react-redux';
import {compose, withState, withHandlers, lifecycle} from 'recompose';
import {change} from 'redux-form';
import ReactMapboxGl, {Marker, ZoomControl} from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import {withRouter} from 'react-router-dom';
import {setPlace, getPlaces} from '../../store/reducers/places';
import {setCoordinates, showPopup} from '../../store/reducers/map';
import {Translations} from '../../translations';
import {PlacesLayer} from './places';
import {MapMessage} from './map-message';
import Popup from './popup';
import Configuration from './configuration';

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_ACCESS_TOKEN,
});

const bounds = [
  [23.913357418542574, 49.79143483274228],
  [24.138021486231335, 49.888010533011425],
];

const MapBox = props => {
  const {places, setPlace, location, selected, setMarker, setMarkerToggle, coordinates, showPopup, showPopupToggle, setCoordinates, place} = props;

  const showPopupOnLocation = () => {
    return location.pathname === '/create-tour' ? showPopupToggle({popup: true, btn: true}) : showPopupToggle({popup: true, btn: false});
  };

  const renderMapMessage = () => {
    switch (location.pathname) {
      case '/create-tour': {
        return <MapMessage text={Translations.mapInstructions.createTour}/>;
      }
      case 'create-place': {
        return <MapMessage text="Click on the map to select place"/>;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Map
      center={coordinates}
      className="map"
      maxBounds={bounds}
      style="mapbox://styles/flyerok/cjm0p1rpf07p92rmxzb59r2kf"
      zoom={[16]}
      onClick={location.pathname === '/create-place' ? (map => setMarker(map)) : (() => showPopupToggle({popup: false, btn: false}))}
      onStyleLoad={map => {
        const geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        });

        map.addControl(geolocate);

        geolocate.on('geolocate', e => {
          const lon = e.coords.longitude;
          const lat = e.coords.latitude;
          const position = [lon, lat];
          console.log(position);
        });
      }}
    >
      <Configuration location={location}/>
      <ZoomControl style={{marginTop: 40, marginRight: 1}}/>
      <PlacesLayer {...{
        setCoordinates: location.pathname !== '/create-place' && setCoordinates,
        setPlace: location.pathname !== '/create-place' && setPlace,
        places, showPopupToggle: showPopupOnLocation}}/>
      {showPopup.popup && place && <Popup {...{coordinates, showButton: showPopup.btn}}/>}
      {renderMapMessage()}
      {location.pathname === '/create-place' && selected && (
        <Marker coordinates={coordinates}>
          <div style={{
            backgroundColor: '#e74c3c',
            borderRadius: '50%',
            width: 10,
            height: 10,
            border: '4px solid #eaa29b',
          }}/>
        </Marker>
      )}
    </Map>
  );
};

const mapStateToProps = state => ({
  place: state.placesState.place,
  places: state.placesState.places,
  coordinates: state.map.coordinates,
  showPopup: state.map.showPopup,
});

export default compose(
  withRouter,
  connect(mapStateToProps, {setPlace, change, setCoordinates, getPlaces, showPopupToggle: showPopup}),
  withState('selected', 'setMarkerToggle', false),
  withHandlers({
    setMarker: ({setMarkerToggle, change, setCoordinates}) => map => map.on('click', e => {
      setMarkerToggle(true);
      setCoordinates([e.lngLat.lng, e.lngLat.lat]);
      change('createPlace', 'longitude', e.lngLat.lng);
      change('createPlace', 'latitude', e.lngLat.lat);
    }),
  }),
  lifecycle({
    async componentDidMount() {
      const {getPlaces, location} = this.props;
      if (location.pathname !== '/suggestions') {
        await getPlaces();
      }
    },
    componentDidUpdate(prevProps) {
      if (prevProps.location.pathname !== this.props.location.pathname && this.props.location.pathname === '/create-place') {
        this.props.setMarkerToggle(false);
      }
    },
  }),
)(MapBox);
