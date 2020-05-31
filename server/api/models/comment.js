const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      text: String,
    },
    {
      timestamps: true
    });


module.exports = mongoose.model('Comment', CommentSchema);