const mongoose = require('mongoose');

const placeCategoriesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    type: Number,
    subCategories: Array,
});

module.exports = mongoose.model('PlaceCategories', placeCategoriesSchema);
