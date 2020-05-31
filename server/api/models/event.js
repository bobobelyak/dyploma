const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      imgUrl: {type: String, required: true},
      author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      confirmed: {type: Boolean, required: true, default: false},
      comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
      likes: [{type: String}],
      dislikes: [{type: String}],
      eventDate: {type: Date, required: true},
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

module.exports = mongoose.model('Event', eventSchema);
