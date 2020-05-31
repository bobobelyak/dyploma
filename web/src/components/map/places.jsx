import React from 'react';
import {Layer, Feature} from 'react-mapbox-gl';

export const PlacesLayer = ({places, setCoordinates, setPlace, showPopupToggle}) => places.map(place => (
  <Layer
    key={place._id}
    type="symbol"
    id={place._id}
    minZoom={place.placeZoom}
    layout={{
      'icon-image': {type: 'identity', property: 'iconImage'},
      'icon-size': {type: 'identity', property: 'iconSize'},
      'text-field': '{title}',
      'text-font': ['Roboto Regular, Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-offset': [0, 0.6],
      'text-anchor': 'top',
    }}
  >
    <Feature
      properties={{
        id: place._id,
        title: place.name || place.en.name,
        iconImage: place.iconImage,
        iconSize: place.iconSize,
      }}
      coordinates={[place.longitude, place.latitude]}
      onClick={() => {
        setCoordinates([place.longitude, place.latitude]);
        setPlace(place);
        showPopupToggle();
      }}
      onMouseEnter={({map}) => {
        map.getCanvas().style.cursor = 'pointer';
      }}
      onMouseLeave={({map}) => {
        map.getCanvas().style.cursor = '';
      }}
    />
  </Layer>
));
