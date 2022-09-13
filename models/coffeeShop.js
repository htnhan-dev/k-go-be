const mongoose = require("mongoose");

const coffeeShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 6,
      unique: true,
    },
    district: {
      type: String,
      required: true,
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
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CoffeeShop", coffeeShopSchema);
