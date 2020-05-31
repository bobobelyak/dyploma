const Feed = require('../models/feed');
const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const moment = require('moment');

const get = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const userId = token && JWT.decode(token)._id;

  Feed.find({confirmed: false})
      .sort({createdAt: -1})
      .populate({path: 'author'})
      .exec()
      .then(result => {
        res.status(200).json({
          feeds: result.map(feed => ({
            _id: feed._id,
            imgUrl: req.protocol + '://' + req.headers.host + '/' + feed.imgUrl,
            type: feed.type,
            author: { name: feed.author.name, avatar: feed.author.avatar },
            likes: feed.likes.length,
            dislikes: feed.dislikes.length,
            ...(userId ? {liked: feed.likes.indexOf(userId) > -1} : {liked: false}),
            ...(userId ? {disliked: feed.dislikes.indexOf(userId) > -1} : {disliked: false}),
            comments: feed.comments.length,
            createdAt: feed.createdAt,
            ...feed[req.query.language],
          })),
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
};

const getTop5 = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const userId = token && JWT.decode(token)._id;

  // Prev month
  // $gte: moment().subtract(1, 'months').startOf('month').toDate()
  // $lte: moment().subtract(1, 'months').endOf('month').toDate()

  Feed.find({
    confirmed: false,
    createdAt: {
      $gte: moment().startOf('month').toDate(),
      $lte: moment().endOf('month').toDate()
    }
  })
      .sort("-likes")
      .limit(5)
      .populate({path: 'author'})
      .exec()
      .then(result => {
        res.status(200).json({
          feeds: result.map(feed => ({
            _id: feed._id,
            imgUrl: req.protocol + '://' + req.headers.host + '/' + feed.imgUrl,
            type: feed.type,
            author: { name: feed.author.name, avatar: feed.author.avatar },
            likes: feed.likes.length,
            dislikes: feed.dislikes.length,
            ...(userId ? {liked: feed.likes.indexOf(userId) > -1} : {liked: false}),
            ...(userId ? {disliked: feed.dislikes.indexOf(userId) > -1} : {disliked: false}),
            comments: feed.comments.length,
            createdAt: feed.createdAt,
            ...feed[req.query.language],
          })),
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
};

const getTopOfPreviousMonth = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  const userId = token && JWT.decode(token)._id;

  Feed.find({
    confirmed: false,
    createdAt: {
      $gte: moment().subtract(1, 'months').startOf('month').toDate(),
      $lte: moment().subtract(1, 'months').endOf('month').toDate()
    }
  })
      .sort("-likes")
      .limit(5)
      .populate({path: 'author'})
      .exec()
      .then(result => {
        res.status(200).json({
          feeds: result.map(feed => ({
            _id: feed._id,
            imgUrl: req.protocol + '://' + req.headers.host + '/' + feed.imgUrl,
            type: feed.type,
            author: { name: feed.author.name, avatar: feed.author.avatar },
            likes: feed.likes.length,
            dislikes: feed.dislikes.length,
            ...(userId ? {liked: feed.likes.indexOf(userId) > -1} : {liked: false}),
            ...(userId ? {disliked: feed.dislikes.indexOf(userId) > -1} : {disliked: false}),
            comments: feed.comments.length,
            createdAt: feed.createdAt,
            header: feed[req.query.language].header,
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

  Feed
      .findById(id)
      .populate({path: 'comments', options: {sort: {'createdAt': 'descending'}}, populate: {path: 'author'}})
      .populate({path: 'author'})
      .exec()
      .then(feed => {
        res.status(200).json({
          feed: {
            _id: feed._id,
            imgUrl: req.protocol + '://' + req.headers.host + '/' + feed.imgUrl,
            type: feed.type,
            author: { name: feed.author.name, avatar: feed.author.avatar },
            likes: feed.likes.length,
            dislikes: feed.dislikes.length,
            ...(userId ? {liked: feed.likes.indexOf(userId) > -1} : {liked: false}),
            ...(userId ? {disliked: feed.dislikes.indexOf(userId) > -1} : {disliked: false}),
            comments: feed.comments.map(comment => ({
              _id: comment._id,
              authorName: comment.author.name,
              avatar: comment.author.avatar,
              text: comment.text,
              createdAt: comment.createdAt,
            })),
            createdAt: feed.createdAt,
            ...feed[req.query.language],
          },
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
};

const create = (req, res, next) => {
  const feed = new Feed({
    _id: new mongoose.Types.ObjectId(),
    imgUrl: req.file.path,
    type: req.body.type,
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
  get,
  create,
  getSingle,
  getTop5,
  getTopOfPreviousMonth
};
