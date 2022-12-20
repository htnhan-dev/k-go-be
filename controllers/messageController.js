const Message = require("../models/message");

const messageController = {
  addMessage: async (req, res) => {
    try {
      const chatId = req.body.chatId;
      const senderId = req.body.senderId;
      const text = req.body.text;

      const newMessage = new Message({
        chatId,
        senderId,
        text,
      });

      const result = await newMessage.save();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getMessage: async (req, res) => {
    try {
      const chatId = req.params.chatId;
      const result = await Message.find({ chatId });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = messageController;
