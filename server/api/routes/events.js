const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const uuid = require('uuid/v1');
const crypto = require('crypto');
const mime = require('mime');

const {checkRole} = require('../middlewares/checkRole');
const passportJWT = passport.authenticate('jwt', { session: false });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/feeds');
  },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) =>{
      cb(null, uuid() + '.' + mime.getExtension(file.mimetype));
    });
  }
});

const upload = multer({storage});

const EventsController = require('../controllers/events');
const CommentController = require('../controllers/comment');

// router.post('/post-comment', passportJWT, CommentController.postCommentFeed);
router.post('/like', passportJWT, CommentController.likeEvent);
router.post('/dislike', passportJWT, CommentController.dislikeEvent);


router.get('/', EventsController.getThisMonthEvents);
router.get('/coming', EventsController.getThisMonthEvents);
router.post('/', upload.single('image'), EventsController.create);
// router.get('/:id', FeedsController.getSingle);


module.exports = router;
