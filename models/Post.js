const mongoose = require('mongoose');
const { Schema } = mongoose;

// creat Schema
const PostSchema = new Schema({
  title: String,
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  }
});

const Post = mongoose.model('Photo', PhotoSchema);

module.exports(Post)