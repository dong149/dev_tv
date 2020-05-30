const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlSchema = new Schema({
  url: String,
  videoId: String,
  title: String,
  channel: String,
  author: String,
  categories: Array,
  password: String,
  date: String,
  good: Number,
  bad: Number,
});

mongoose.model("urls", urlSchema);
