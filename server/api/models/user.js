const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      userId: String,
      avatar: String,
      email: String,
      role: String,
      likedPlaces: [{type: mongoose.Schema.Types.ObjectId, ref: 'Place'}],
      likedFeeds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Feed'}],
      likedEvents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
      tours: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tour'}]
    },
    {
      timestamps: true
    });

UserSchema.statics.findOrCreate = require("find-or-create");

module.exports = mongoose.model('User', UserSchema);
