const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  text: { type: String, required: true },
  tag: { type: String, required: true },
  time: {
    type: Date,
    default: Date.now,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

// Formatting the time when retrieving the document
PostSchema.methods.getFormattedTime = function () {
  return DateTime.fromJSDate(this.time).toLocaleString(DateTime.DATE_MED);
};

module.exports = mongoose.model("Post", PostSchema);
