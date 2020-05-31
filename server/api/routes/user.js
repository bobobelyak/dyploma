const express = require('express');
const passport = require('passport');
const router = express.Router();

const UsersController = require('../controllers/users');
const TourController = require('../controllers/tour');

const {checkRole} =require('../middlewares/checkRole');


const passportJWT = passport.authenticate('jwt', { session: false });

router.get('/liked-places', passportJWT, UsersController.getLikedPlaces);
router.get('/tours', passportJWT, UsersController.getTours);
router.post('/create-tour', passportJWT, TourController.create);


module.exports = router;