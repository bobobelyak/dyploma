const Event = require('../models/event');
const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const moment = require('moment');

const getThisMonthEvents = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const userId = token && JWT.decode(token)._id;

  Event.find({
    confirmed: false,
    eventDate: {
      $gte: moment().startOf('month').toDate(),
      $lte: moment().endOf('month').toDate()
    }
  })
      .sort({eventDate: -1})
      .populate({path: 'author'})
      .exec()
      .then(result => {
        res.status(200).json({
          events: result.map(event => ({
            _id: event._id,
            imgUrl: req.protocol + '://' + req.headers.host + '/' + event.imgUrl,
            eventDate: event.eventDate,
            author: { name: event.author.name, avatar: event.author.avatar },
            likes: event.likes.length,
            dislikes: event.dislikes.length,
            ...(userId ? {liked: event.likes.indexOf(userId) > -1} : {liked: false}),
            ...(userId ? {disliked: event.dislikes.indexOf(userId) > -1} : {disliked: false}),
            comments: event.comments.length,
            createdAt: event.createdAt,
            ...event[req.query.language],
          })),
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
};

const getComingEvents = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const userId = token && JWT.decode(token)._id;

  // Prev month
  // $gte: moment().subtract(1, 'months').startOf('month').toDate()
  // $lte: moment().subtract(1, 'months').endOf('month').toDate()

  Event.find({
    confirmed: false,
    createdAt: {
      $gte: moment().add(1, 'months').startOf('month').toDate(),
      $lte: moment().add(12, 'months').endOf('month').toDate()
    }
  })
      .populate({path: 'author'})
      .exec()
      .then(result => {
        res.status(200).json({
          events: result.map(event => ({
            _id: event._id,
            imgUrl: req.protocol + '://' + req.headers.host + '/' + event.imgUrl,
            eventDate: event.eventDate,
            author: { name: event.author.name, avatar: event.author.avatar },
            likes: event.likes.length,
            dislikes: event.dislikes.length,
            ...(userId ? {liked: event.likes.indexOf(userId) > -1} : {liked: false}),
            ...(userId ? {disliked: event.dislikes.indexOf(userId) > -1} : {disliked: false}),
            comments: event.comments.length,
            createdAt: event.createdAt,
            ...event[req.query.language],
          })),
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
};

const create = (req, res, next) => {
  const feed = new Event({
    _id: new mongoose.Types.ObjectId(),
    imgUrl: req.file.path,
    eventDate: req.body.eventDate,
    author: req.body.userId,
    ua: {
      header: req.body.uaHeader,
      shortDescription: req.body.uaShortDescription,
      text: req.body.uaText,
    },
    en: {
      header: req.body.enHeader,
      shortDescription: req.body.enShortDescription,
      text: req.body.enText,
    }
  });
  feed.save()
      .then(result => {
        res.status(200).json({
          feed: result,
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
};

module.exports = {
  getComingEvents,
  getThisMonthEvents,
  create,
};
