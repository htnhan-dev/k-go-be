const mongosee = require("mongoose");

const notiSchema = new mongosee.Schema(
  {
    sender: {
      _id: String,
      userName: String,
      avatar: String,
    },
    receiver: {
      _id: String,
      userName: String,
      avatar: String,
    },
    content: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongosee.model("Notification", notiSchema);
