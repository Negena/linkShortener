const mongoose = require("mongoose");
const shortId = require("shortid");

const schema = new mongoose.Schema({
  full: {
    type: String
  },
  short: {
    type: String,
    default: shortId.generate
  },
  clicks: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("ShortUrl", schema);
