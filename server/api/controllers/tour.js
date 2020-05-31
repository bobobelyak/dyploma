const Tour = require('../models/tour');
const User = require('../models/user');
const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');

const create = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const userRole = token && JWT.decode(token).role;

  if (req.body.type > 0 && userRole !== 'admin') {
    return res.status(401).json({
      error: `You don't have permissions for this action`,
    });
  }

  const tour = new Tour({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    ...(req.body.type && {type: req.body.type}),
    ...(req.body.price > 0 && {price: req.body.price}),
    ...(req.body.tourDescription  && {tourDescription: req.body.tourDescription}),
    ...(req.body.type === 2 || req.body.type === 1 && req.body.contactPhone  && {contactPhone: req.body.contactPhone}),
    ...(req.body.type === 2 || req.body.type === 1 && req.body.contactUrl  && {contactUrl: req.body.contactUrl}),
    routes: req.body.routes.map(route => ({
      place: route._id,
      ...(route.route && {route: route.route}),
      ...(route.distance && {distance: route.distance}),
      ...(route.duration && {duration: route.duration}),
      ...(route.placeDescription && {placeDescription: route.placeDescription}),
    }))
  });
  try {
    const result = await tour.save();
    if (result.type === 0) {
      await User.findByIdAndUpdate(req.user._id, {$push: {tours: result._id}});
    }

    res.status(200).json({
      tour: result,
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    })
  }
};

const getTours = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const user = token ? JWT.decode(token) : null;

  Tour.find({type: req.query.type}).populate({path: 'routes.place'})
      .then(result => {
        res.status(200).json({
          tours: result.map(tour => ({
            _id: tour._id,
            name: tour.name,
            type: tour.type,
            price: tour.price,
            tourDescription: tour.tourDescription,
            contactPhone: tour.contactPhone,
            contactUrl: tour.contactUrl,
            routes: tour.routes.map(route => ({
              _id: route.place._id,
              duration: route.duration,
              distance: route.distance,
              placeDescription: route.placeDescription[req.query.language],
              route: route.route,
              longitude: route.place.longitude,
              latitude: route.place.latitude,
              buildingNumber: route.place.buildingNumber,
              imgUrl: req.protocol + '://' + req.headers.host + '/' + route.place.imgUrl,
              type: route.place.type,
              likes: route.place.likes.length,
              dislikes: route.place.dislikes.length,
              ...(user && user._id ? {liked: route.place.likes.indexOf(user._id) > -1} : {liked: false}),
              ...(user && user._id ? {disliked: route.place.dislikes.indexOf(user._id) > -1} : {disliked: false}),
              comments: route.place.comments.length,
              ...route.place[req.query.language],
            })),
            createdAt: tour.createdAt,
          })),
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
};

module.exports = {
  create,
  getTours,
};
