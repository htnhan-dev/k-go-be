const mongosee = require("mongoose");

const messageSchema = new mongosee.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
    type: {
      type: Number,
      default: 1,
    },
    images: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongosee.model("Message", messageSchema);
