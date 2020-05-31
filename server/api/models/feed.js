const mongoose = require('mongoose');

const feedSchema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      imgUrl: {type: String, required: true},
      type: {type: Number, required: true, default: 0},
      author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      confirmed: {type: Boolean, required: true, default: false},
      comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
      likes: [{type: String}],
      dislikes: [{type: String}],
      ua: {
        header: {type: String, required: true},
        shortDescription: {type: String, required: true},
        text: {type: String, required: true},
      },
      en: {
        header: {type: String, required: true},
        shortDescription: {type: String, required: true},
        text: {type: String, required: true},
      }
    },
    {
      timestamps: true
    });

module.exports = mongoose.model('Feed', feedSchema);
