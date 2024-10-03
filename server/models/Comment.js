const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  text: { type: String },
  time: {
    type: Date,
    default: () => DateTime.local().toLocaleString(
      { month: 'long', day: '2-digit', year: 'numeric' }),
  },
  user: { type: String }
});

module.exports = mongoose.model("Comment", CommentSchema);
