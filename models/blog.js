const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
    },
    poster: {
      type: String,
      default: "Kai",
    },
    thumnail: {
      type: String,
    },
    description: {
      type: String,
    },
    categoryBlog: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Blog", blogSchema);
