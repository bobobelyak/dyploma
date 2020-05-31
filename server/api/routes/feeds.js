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

const FeedsController = require('../controllers/feeds');
const CommentController = require('../controllers/comment');

router.post('/post-comment', passportJWT, CommentController.postCommentFeed);
router.post('/like', passportJWT, CommentController.likeFeed);
router.post('/dislike', passportJWT, CommentController.dislikeFeed);


router.get('/', FeedsController.get);
router.get('/top-5', FeedsController.getTop5);
router.get('/top-previous-month', FeedsController.getTopOfPreviousMonth);
router.post('/', upload.single('image'), FeedsController.create);
router.get('/:id', FeedsController.getSingle);


module.exports = router;
