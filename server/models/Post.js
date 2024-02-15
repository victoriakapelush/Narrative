const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Comment = require("../models/Comment");

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
  text: { type: String },
  tag: { type: String },
  time: {
    type: Date,
    default: () => DateTime.local().toLocaleString(
      { month: 'long', day: '2-digit', year: 'numeric' }),
  },
  user: { type: String },
  comments: [String]
});

module.exports = mongoose.model("Post", PostSchema);