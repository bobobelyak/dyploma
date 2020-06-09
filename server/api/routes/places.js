const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const uuid = require('uuid/v1');
const crypto = require('crypto');
const mime = require('mime');

const {checkRole} =require('../middlewares/checkRole');
const passportJWT = passport.authenticate('jwt', { session: false });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) =>{
      cb(null, uuid() + '.' + mime.getExtension(file.mimetype));
    });
  }
});

const upload = multer({storage});

const PlaceController = require('../controllers/places');
const CommentController = require('../controllers/comment');

router.delete('/delete-comment', passportJWT, checkRole(['admin']), CommentController.removeComment);
router.post('/post-comment', passportJWT, CommentController.postComment);
router.patch('/like', passportJWT, CommentController.like);
router.patch('/dislike', passportJWT, CommentController.dislike);


router.get('/', PlaceController.get);
router.get('/search', PlaceController.search);
router.get('/top', PlaceController.top);
router.get('/suggestions', passportJWT, checkRole(['admin', 'moderator']), PlaceController.getSuggestions);
router.get('/:id', PlaceController.getSingle);
router.post('/', passportJWT, checkRole(['admin']), upload.single('image'), PlaceController.create);
router.patch('/:id', passportJWT, checkRole(['admin', 'moderator']), PlaceController.update);
router.delete('/:id', passportJWT, checkRole(['admin']), PlaceController.remove);

module.exports = router;
