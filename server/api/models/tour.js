const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      name: {type: String, required: true},
      type: {type: Number, required: true, default: 0},
      tourDescription: {type: String},
      contactPhone: {type: String},
      contactUrl: {type: String},
      price: {type: Number},
      routes: [{
        place: {type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true,},
        distance: {type: Number },
        duration: {type: Number },
        route: {type: Object},
        placeDescription: {
          en: {type: String},
          ua: {type: String},
        },
      }],
    },
    {
      timestamps: true
    });

module.exports = mongoose.model('Tour', tourSchema);
