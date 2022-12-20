const mongosee = require("mongoose");

const chatSchema = new mongosee.Schema(
  {
    member: {
      type: Array,
    },
    theme: {
      type: String,
      default: "default",
    },
  },
  { timestamps: true }
);

module.exports = mongosee.model("Chat", chatSchema);
