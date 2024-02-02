const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, minLength: 5 },
  description: { type: String, minLength: 5 },
  image: { type: String },
  text: { type: String, minLength: 5 },
  tag: { type: String },
  time: {
    type: Date,
    default: () => DateTime.local().toLocaleString(
      { month: 'long', day: '2-digit', year: 'numeric' }),
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model("Post", PostSchema);