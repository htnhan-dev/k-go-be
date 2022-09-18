const mongoose = require("mongoose");

const promoSchema = new mongoose.Schema(
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
    thumnail: {
      type: String,
    },
    voucher: {
      type: String,
    },
    place: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promo", promoSchema);
