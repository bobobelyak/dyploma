const Place = require('../models/places');
const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const sendEmail = require('../helpers/email');

const get = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const userId = token && JWT.decode(token)._id;

  Place.find({confirmed: true}).exec()
      .then(result => {
        res.status(200).json({
          places: result.map(place => ({
            _id: place._id,
            longitude: place.longitude,
            latitude: place.latitude,
            buildingNumber: place.buildingNumber,
            imgUrl: req.protocol + '://' + req.headers.host + '/' + place.imgUrl,
            iconSize: place.iconSize,
            placeZoom: place.placeZoom,
            type: place.type,
            iconImage: place.iconImage,
            likes: place.likes.length,
            dislikes: place.dislikes.length,
            ...(userId ? {liked: place.likes.indexOf(userId) > -1} : {liked: false}),
            ...(userId ? {disliked: place.dislikes.indexOf(userId) > -1} : {disliked: false}),
            comments: place.comments.length,
            ...place[req.query.language],
          })),
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
};

const getSingle = (req, res, next) => {
  const id = req.params.id;
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const userId = token && JWT.decode(token)._id;

  Place
      .findById(id)
      .populate({path: 'comments', options: {sort: {'createdAt': 'descending'}}, populate: {path: 'author'}})
      .populate({path: 'author'})
      .exec()
      .then(place => {
        res.status(200).json({
          _id: place._id,
          comments: place.comments.map(comment => ({
            _id: comment._id,
            authorName: comment.author.name,
            avatar: comment.author.avatar,
            text: comment.text,
            createdAt: comment.createdAt,
          })),
          likes: place.likes.length,
          dislikes: place.dislikes.length,
          ...(userId ? {liked: place.likes.indexOf(userId) > -1} : {liked: false}),
          ...(userId ? {disliked: place.dislikes.indexOf(userId) > -1} : {disliked: false}),
          longitude: place.longitude,
          latitude: place.latitude,
          buildingNumber: place.buildingNumber,
          imgUrl: req.protocol + '://' + req.headers.host + '/' + place.imgUrl,
          iconSize: place.iconSize,
          placeZoom: place.placeZoom,
          type: place.type,
          iconImage: place.iconImage,
          ...(place.allowShowName && {author: {name: place.author.name}}),
          ...place[req.query.language],
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
};

const getSuggestions = (req, res, next) => {
  Place
      .find({confirmed: false})
      .populate('author')
      .exec()
      .then(result => {
        res.status(200).json({
          places: result.map(place => ({
            _id: place._id,
            longitude: place.longitude,
            latitude: place.latitude,
            buildingNumber: place.buildingNumber,
            imgUrl: req.protocol + '://' + req.headers.host + '/' + place.imgUrl,
            iconSize: place.iconSize,
            placeZoom: place.placeZoom,
            type: place.type,
            iconImage: place.iconImage,
            author: place.author,
            allowShowName: place.allowShowName,
            en: place.en,
            ua: place.ua,
            createdAt: place.createdAt,
          })),
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
};

const create = (req, res, next) => {
  const place = new Place({
    _id: new mongoose.Types.ObjectId(),
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    imgUrl: req.file.path,
    buildingNumber: req.body.buildingNumber,
    type: req.body.type,
    iconImage: req.body.iconImage,
    iconSize: req.body.iconSize,
    author: req.body.userId,
    allowShowName: req.body.allowShowName,
    ua: {
      name: req.body.uaName,
      street: req.body.uaStreet,
      description: req.body.uaDescription,
    },
    en: {
      name: req.body.enName,
      street: req.body.enStreet,
      description: req.body.enDescription,
    }

  });
  place.save()
      .then(result => {
        res.status(200).json({
          place: result,
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
};

const update = async (req, res, next) => {
  const id = req.params.id;

  const data = {
    ...req.body,
    ...(req.body.uaName && {
      ua: {
        name: req.body.uaName,
        street: req.body.uaStreet,
        description: req.body.uaDescription,
      }
    }),
    ...(req.body.enName && {
      en: {
        name: req.body.enName,
        street: req.body.enStreet,
        description: req.body.enDescription,
      }
    }),
  };

  try {
    const model = await Place.findByIdAndUpdate(id, data, {
      new: true
    }).populate('author');

    res.status(201).json({
      place: model
    });

    if(req.body.confirmed){
      await sendEmail(model.author.email);
    }
  }
  catch (e) {
    res.status(500).json({
      error: "Not able to find place"
    })
  }
};

const remove = (req, res, next) => {
  const id = req.params.id;

  Place.remove({_id: id})
      .exec()
      .then(result => {
        res.status(200).json({id: id});
      })
      .catch(err => {
        res.status(500).json(err);
      })
};

const search = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const userId = token && JWT.decode(token)._id;
  // Place.schema.options.autoIndex = true;
  // Place.ensureIndexes((err) => {
  //   if (err){
  //     return res.status(500).json({error: err});
  //   }
  // let query = [
  //   {'en.name': {$regex: new RegExp(req.query.searchString, "i")}},
  //   {'ua.name': {$regex: new RegExp(req.query.searchString, "i")}},
  // ];

  let query = [{[`${req.query.language}.name`]: {$regex: new RegExp(req.query.searchString, "i")}}];


  Place.find({$or: query, confirmed: true})
      .limit(5)
      .exec()
      .then(result => {
        res.status(200).json({
          places: result.map(place => ({
            _id: place._id,
            longitude: place.longitude,
            latitude: place.latitude,
            buildingNumber: place.buildingNumber,
            imgUrl: req.protocol + '://' + req.headers.host + '/' + place.imgUrl,
            likes: place.likes.length,
            dislikes: place.dislikes.length,
            ...(userId ? {liked: place.likes.indexOf(userId) > -1} : {liked: false}),
            ...(userId ? {disliked: place.dislikes.indexOf(userId) > -1} : {disliked: false}),
            comments: place.comments.length,
            ...place[req.query.language],
          })),
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err,
        })
      })
  // });
};

const top = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const userId = token && JWT.decode(token)._id;

  Place.aggregate([
    {
      "$project": {
        "_id": 1,
        "longitude": 1,
        "latitude": 1,
        "buildingNumber": 1,
        "imgUrl": 1,
        "likes": 1,
        "dislikes": 1,
        "comments": 1,
        "en": 1,
        "ua": 1,
        "length": {"$size": "$likes"}
      }
    },
    {"$sort": {"length": -1}}
  ])
      .limit(Number(req.query.limit))
      .exec()
      .then(result => {
        res.status(200).json({
          places: result.map(place => ({
            _id: place._id,
            longitude: place.longitude,
            latitude: place.latitude,
            buildingNumber: place.buildingNumber,
            imgUrl: req.protocol + '://' + req.headers.host + '/' + place.imgUrl,
            likes: place.likes.length,
            dislikes: place.dislikes.length,
            ...(userId ? {liked: place.likes.indexOf(userId) > -1} : {liked: false}),
            ...(userId ? {disliked: place.dislikes.indexOf(userId) > -1} : {disliked: false}),
            comments: place.comments.length,
            ...place[req.query.language],
          })),
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err,
        })
      })
};

module.exports = {
  get,
  getSuggestions,
  create,
  update,
  remove,
  getSingle,
  search,
  top
};
