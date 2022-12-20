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
  },
  { timestamps: true }
);

module.exports = mongosee.model("Message", messageSchema);
