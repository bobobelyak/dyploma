import {request} from '../../api/common';

export const addRoute = async (map, place, coordinatesStart, coordinatesEnd, setPlace, routeList) => {
  const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinatesStart[0]},${coordinatesStart[1]};${coordinatesEnd[0]},${coordinatesEnd[1]}?geometries=geojson&access_token=pk.eyJ1IjoiZmx5ZXJvayIsImEiOiJjam1nbXA1czMyeGNnM2tudGRrZTIxZXdpIn0.0UxTWf-Gcd4hSGg-mOsLKg`;
  const response = await request('GET', directionsRequest, null, true);

  if (response.ok) {
    const result = await response.json();
    const route = result.routes[0].geometry;

    const distance = result.routes[0].distance; // Meters
    const duration = result.routes[0].duration / 60; // Minutes

    console.log(distance, duration, route);

    setPlace({...place, distance, duration, route});
    map.addLayer({
      id: place._id + 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route,
        },
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'butt',
      },
      paint: {
        'line-width': 7,
        'line-color': 'sandybrown',
      },
    });
    if (routeList.length > 0) {
      routeList.forEach(route => map.moveLayer(route._id));
      map.moveLayer(place._id);
    }
  }
};

export const addExisting = (map, routes) => {
  routes.forEach(route => map.addLayer({
    id: route._id + 'route',
    type: 'line',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: route.route,
      },
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'butt',
    },
    paint: {
      'line-width': 7,
      'line-color': 'sandybrown',
    },

  }));
  if (routes.length > 0) {
    routes.forEach(route => map.moveLayer(route._id));
  }
};
