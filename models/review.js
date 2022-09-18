const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    iduser: {
      type: String,
    },
    nameuser: {
      type: String,
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    idplace: {
      type: String,
      required: true,
    },
    place: {
      type: String,
    },
    rating: [],
    like: {
      type: Number,
      default: 0,
    },
    comment: {
      type: [],
      timestamps: true,
    },
    libraryImg: {
      type: [],
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
