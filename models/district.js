const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("District", districtSchema);
