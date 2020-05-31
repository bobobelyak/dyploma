const JWT = require('jsonwebtoken');
const User = require('../models/user');

signToken = user => {
  return JWT.sign({
    _id: user._id,
    userId: user.userId,
    role: user.role,
    name: user.name,
    avatar: user.avatar,
    email: user.email,
  }, process.env.JWT_SECRET);
};

getLikedPlaces = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('likedPlaces');
    res.status(200).json({
      likedPlaces: user.likedPlaces.map(place => ({
        _id: place._id,
        longitude: place.longitude,
        latitude: place.latitude,
        buildingNumber: place.buildingNumber,
        imgUrl: req.protocol + '://' + req.headers.host + '/' + place.imgUrl,
        type: place.type,
        likes: place.likes.length,
        dislikes: place.dislikes.length,
        ...(req.user._id ? {liked: place.likes.indexOf(req.user._id) > -1} : {liked: false}),
        ...(req.user._id ? {disliked: place.dislikes.indexOf(req.user._id) > -1} : {disliked: false}),
        comments: place.comments.length,
        ...place[req.query.language],
      })),
    })
  } catch (err) {
    res.status(200).json({
      error: err
    })
  }
};

getTours = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate({path: 'tours', populate: {path: 'routes.place'}});
    res.status(200).json({
      tours: user.tours.map(tour => {
        return {
          _id: tour._id,
          name: tour.name,
          type: tour.type,
          routes: tour.routes.map(route => ({
            _id: route.place._id,
            duration: route.duration,
            distance: route.distance,
            route: route.route,
            longitude: route.place.longitude,
            latitude: route.place.latitude,
            buildingNumber: route.place.buildingNumber,
            imgUrl: req.protocol + '://' + req.headers.host + '/' + route.place.imgUrl,
            type: route.place.type,
            likes: route.place.likes.length,
            dislikes: route.place.dislikes.length,
            ...(req.user._id ? {liked: route.place.likes.indexOf(req.user._id) > -1} : {liked: false}),
            ...(req.user._id ? {disliked: route.place.dislikes.indexOf(req.user._id) > -1} : {disliked: false}),
            comments: route.place.comments.length,
            ...route.place[req.query.language],
          })),
          createdAt: tour.createdAt,
        };
      }),
    })
  } catch (err) {
    res.status(200).json({
      error: err
    })
  }
};


module.exports = {
  facebookOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({token});
  },
  getLikedPlaces,
  getTours
};