const mongoose = require("mongoose");

const categoryBlogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CategoryBlog", categoryBlogSchema);
