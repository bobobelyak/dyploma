const express = require('express');
const passport = require('passport');
const passportConf = require('../passport');
const router = express.Router();

const UsersController = require('../controllers/users');

const passportJWT = passport.authenticate('jwt', { session: false });

router.post('/oauth/facebook', passport.authenticate('facebookToken', { session: false }), UsersController.facebookOAuth);

module.exports = router;