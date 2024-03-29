const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: 6,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNumber: {
      type: Number,
    },
    sex: {
      type: Number,
      default: 0,
    },
    socialList: {
      type: Object,
    },
    following: {
      type: [],
    },
    follower: {
      type: [],
    },
    avatar: {
      type: String,
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
