const mongoose = require('mongoose');

const Place = require('../models/places');
const Feed = require('../models/feed');
const Event = require('../models/event');
const User = require('../models/user');
const Comment = require('../models/comment');

const postComment = async (req, res, next) => {
  try {
    await Place.findById(req.body.placeId);
  } catch (e) {
    return res.status(404).json({
      error: "Sight not found"
    });
  }

  try {
    await User.findById(req.user._id);
  } catch (e) {
    return res.status(404).json({
      error: "You should be logged in to post comments"
    });
  }

  const comment = new Comment({
    _id: mongoose.Types.ObjectId(),
    text: req.body.text,
    author: req.user._id,
  });

  try {
    const savedComment = await comment.save();
    await Place.findByIdAndUpdate(req.body.placeId, {$push: {comments: savedComment._id}});
    const newComment = await Comment.findById(savedComment._id).populate('author');

    return res.status(200).json({
      _id: newComment._id,
      authorName: newComment.author.name,
      avatar: newComment.author.avatar,
      text: newComment.text,
      createdAt: newComment.createdAt,
    });
  } catch (e) {
    return res.status(500).json({
      error: 'Unable to post comment'
    });
  }
};

const removeComment = (req, res, next) => {
  Place.findByIdAndUpdate(req.body.placeId, {
    $pull: {"comments": req.body.commentId}
  }, {multi: true})
      .exec()
      .then(result => {
        return res.status(200).json({
          commentId: req.body.commentId,
        });
      })
      .catch(err => {
        return res.status(500).json({
          error: err
        });
      })
};

const like = async (req, res, next) => {
  // try {
  const place = await Place.findById(req.body.placeId);
  // const user = await User.findById(req.body.userId);

    if (place.likes.indexOf(req.user._id) > -1) {
      try {
        const updatedPlace = await Place.findByIdAndUpdate(req.body.placeId, {
          $pull: {"likes": req.user._id}
        }, {new: true});
        await User.findByIdAndUpdate(req.user._id, {$pull: {likedPlaces: updatedPlace._id}});

        return res.status(200).json({
          placeId: req.body.placeId,
          liked: false,
          disliked: false,
          likes: updatedPlace.likes.length,
          dislikes: updatedPlace.dislikes.length,
        })
      } catch (err) {
        return res.status(500).json({
          error: err
        });
      }
    } else {
      try {
        const updatedPlace = await Place.findByIdAndUpdate(req.body.placeId, {
          $push: {"likes": req.user._id},
          $pull: {"dislikes": req.user._id},
        }, {new: true});

        await User.findByIdAndUpdate(req.user._id, {$push: {likedPlaces: updatedPlace._id}});

        return res.status(200).json({
          placeId: req.body.placeId,
          liked: true,
          disliked: false,
          likes: updatedPlace.likes.length,
          dislikes: updatedPlace.dislikes.length,
        })
      } catch (err) {
        return res.status(500).json({
          error: err
        });
      }
    }
};

const dislike = async (req, res, next) => {
  // try {
  const place = await Place.findById(req.body.placeId);
  // const user = await User.findById(req.body.userId);

  if (place.dislikes.indexOf(req.user._id) > -1) {
    try {
      const updatedPlace = await Place.findByIdAndUpdate(req.body.placeId, {
        $pull: {"dislikes": req.user._id}
      }, {new: true});
      // await User.findByIdAndUpdate(req.user._id, {$pull: {likedPlaces: updatedPlace._id}});

      return res.status(200).json({
        placeId: req.body.placeId,
        liked: false,
        disliked: false,
        likes: updatedPlace.likes.length,
        dislikes: updatedPlace.dislikes.length,
      })
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  } else {
    try {
      const updatedPlace = await Place.findByIdAndUpdate(req.body.placeId, {
        $push: {"dislikes": req.user._id},
        $pull: {"likes": req.user._id},
      }, {new: true});

      await User.findByIdAndUpdate(req.user._id, {$pull: {likedPlaces: updatedPlace._id}});

      return res.status(200).json({
        placeId: req.body.placeId,
        liked: false,
        disliked: true,
        likes: updatedPlace.likes.length,
        dislikes: updatedPlace.dislikes.length,
      })
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  }
};

const postCommentFeed = async (req, res, next) => {
  try {
    await Feed.findById(req.body.feedId);
  } catch (e) {
    return res.status(404).json({
      error: "Feed not found"
    });
  }

  try {
    await User.findById(req.user._id);
  } catch (e) {
    return res.status(404).json({
      error: "You should be logged in to post comments"
    });
  }

  const comment = new Comment({
    _id: mongoose.Types.ObjectId(),
    text: req.body.text,
    author: req.user._id,
  });

  try {
    const savedComment = await comment.save();
    await Feed.findByIdAndUpdate(req.body.feedId, {$push: {comments: savedComment._id}});
    const newComment = await Comment.findById(savedComment._id).populate('author');

    return res.status(200).json({
      _id: newComment._id,
      authorName: newComment.author.name,
      avatar: newComment.author.avatar,
      text: newComment.text,
      createdAt: newComment.createdAt,
    });
  } catch (e) {
    return res.status(500).json({
      error: 'Unable to post comment'
    });
  }
};

const likeFeed = async (req, res, next) => {
  // try {
  const feed = await Feed.findById(req.body.feedId);
  // const user = await User.findById(req.body.userId);

  if (feed.likes.indexOf(req.user._id) > -1) {
    try {
      const updatedFeed = await Feed.findByIdAndUpdate(req.body.feedId, {
        $pull: {"likes": req.user._id}
      }, {new: true});
      await User.findByIdAndUpdate(req.user._id, {$pull: {likedFeeds: updatedFeed._id}});

      return res.status(200).json({
        feedId: req.body.feedId,
        liked: false,
        disliked: false,
        likes: updatedFeed.likes.length,
        dislikes: updatedFeed.dislikes.length,
      })
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  } else {
    try {
      const updatedFeed = await Feed.findByIdAndUpdate(req.body.feedId, {
        $push: {"likes": req.user._id},
        $pull: {"dislikes": req.user._id},
      }, {new: true});

      await User.findByIdAndUpdate(req.user._id, {$push: {likedFeeds: updatedFeed._id}});

      return res.status(200).json({
        feedId: req.body.feedId,
        liked: true,
        disliked: false,
        likes: updatedFeed.likes.length,
        dislikes: updatedFeed.dislikes.length,
      })
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  }
};

const dislikeFeed = async (req, res, next) => {
  // try {
  const feed = await Feed.findById(req.body.feedId);
  // const user = await User.findById(req.body.userId);

  if (feed.dislikes.indexOf(req.user._id) > -1) {
    try {
      const updatedFeed = await Feed.findByIdAndUpdate(req.body.feedId, {
        $pull: {"dislikes": req.user._id}
      }, {new: true});
      // await User.findByIdAndUpdate(req.user._id, {$pull: {likedPlaces: updatedPlace._id}});

      return res.status(200).json({
        feedId: req.body.feedId,
        liked: false,
        disliked: false,
        likes: updatedFeed.likes.length,
        dislikes: updatedFeed.dislikes.length,
      })
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  } else {
    try {
      const updatedFeed = await Feed.findByIdAndUpdate(req.body.feedId, {
        $push: {"dislikes": req.user._id},
        $pull: {"likes": req.user._id},
      }, {new: true});

      await User.findByIdAndUpdate(req.user._id, {$pull: {likedFeeds: updatedFeed._id}});

      return res.status(200).json({
        feedId: req.body.feedId,
        liked: false,
        disliked: true,
        likes: updatedFeed.likes.length,
        dislikes: updatedFeed.dislikes.length,
      })
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  }
};

const likeEvent = async (req, res, next) => {
  // try {
  const event = await Event.findById(req.body.eventId);
  // const user = await User.findById(req.body.userId);

  if (event.likes.indexOf(req.user._id) > -1) {
    try {
      const updatedEvent = await Feed.findByIdAndUpdate(req.body.eventId, {
        $pull: {"likes": req.user._id}
      }, {new: true});
      await User.findByIdAndUpdate(req.user._id, {$pull: {likedEvents: updatedEvent._id}});

      return res.status(200).json({
        eventId: req.body.eventId,
        liked: false,
        disliked: false,
        likes: updatedEvent.likes.length,
        dislikes: updatedEvent.dislikes.length,
      })
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  } else {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(req.body.eventId, {
        $push: {"likes": req.user._id},
        $pull: {"dislikes": req.user._id},
      }, {new: true});

      await User.findByIdAndUpdate(req.user._id, {$push: {likedEvents: updatedEvent._id}});

      return res.status(200).json({
        eventId: req.body.eventId,
        liked: true,
        disliked: false,
        likes: updatedEvent.likes.length,
        dislikes: updatedEvent.dislikes.length,
      })
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  }
};

const dislikeEvent = async (req, res, next) => {
  // try {
  const event = await Event.findById(req.body.eventId);
  // const user = await User.findById(req.body.userId);

  if (event.dislikes.indexOf(req.user._id) > -1) {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(req.body.eventId, {
        $pull: {"dislikes": req.user._id}
      }, {new: true});
      // await User.findByIdAndUpdate(req.user._id, {$pull: {likedPlaces: updatedPlace._id}});

      return res.status(200).json({
        eventId: req.body.eventId,
        liked: false,
        disliked: false,
        likes: updatedEvent.likes.length,
        dislikes: updatedEvent.dislikes.length,
      })
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  } else {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(req.body.eventId, {
        $push: {"dislikes": req.user._id},
        $pull: {"likes": req.user._id},
      }, {new: true});

      await User.findByIdAndUpdate(req.user._id, {$pull: {likedFeeds: updatedEvent._id}});

      return res.status(200).json({
        eventId: req.body.eventId,
        liked: false,
        disliked: true,
        likes: updatedEvent.likes.length,
        dislikes: updatedEvent.dislikes.length,
      })
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  }
};


module.exports = {
  postComment,
  postCommentFeed,
  removeComment,
  like,
  dislike,
  likeFeed,
  dislikeFeed,
  likeEvent,
  dislikeEvent
};
