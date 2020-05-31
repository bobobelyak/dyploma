const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
      likes: [{type: String}],
      dislikes: [{type: String}],
      type: {type: Number, required: true, default: 0},
      latitude: {type: Number, required: true},
      longitude: {type: Number, required: true},
      buildingNumber: Number,
      imgUrl: {type: String, required: true},
      categories: Number,
      iconImage: {type: String, default: 'place-main'},
      iconSize: {type: Number, default: 0.3},
      placeZoom: {type: Number, default: 14},
      confirmed: {type: Boolean, default: false},
      author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      allowShowName: {type: Boolean, required: true},
      ua: {
        name: {type: String, required: true, },
        street: {type: String, required: true},
        description: {type: String, required: true},
      },
      en: {
        name: {type: String, required: true},
        street: {type: String, required: true},
        description: {type: String, required: true},
      }
    },
    {
      timestamps: true
    });

placeSchema.index({'en.name': 'text', 'ua.name': 'text'});

module.exports = mongoose.model('Place', placeSchema);
