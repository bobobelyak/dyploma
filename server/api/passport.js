const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const FacebookTokenStrategy = require('passport-facebook-token');
const mongoose = require('mongoose');
const User = require('./models/user');

require('dotenv').config();

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));

passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_SECRET
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    const existingUser = await User.findOne({ "userId": profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      userId: profile.id,
      name: profile.displayName,
      avatar: profile.photos[0].value,
      email: profile.emails[0].value,
    });

    await newUser.save();
    done(null, newUser);
  } catch(error) {
    done(error, false, error.message);
  }
}));

module.exports = passport;
