const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlSchema = new Schema({
  url: String,
  videoId: String,
  title: String,
  author: String,
});

mongoose.model("urls", urlSchema);
