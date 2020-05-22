const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  date: String,
  content_id: String,
  author: String,
  comment: String,
});

mongoose.model("comments", commentSchema);
