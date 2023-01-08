const mongoose = require("mongoose");

const savePlaceSchema = new mongoose.Schema(
  {
    idUser: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      minlength: 6,
      unique: true,
    },
    district: {
      type: String,
    },
    category: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    direct: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    contact: [],
    isBoss: {
      type: String,
    },
    services: {
      type: [],
    },
    type: {
      type: [],
    },
    utilities: {
      type: [],
    },
    libraryImg: {
      type: [],
      required: true,
    },
    libraryMenu: {
      type: [],
    },
    slug: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("savePlace", savePlaceSchema);
