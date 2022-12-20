const Chat = require("../models/chat");

const chatController = {
  createdChat: async (req, res) => {
    try {
      const newChat = new Chat({
        member: [req.body.senderId, req.body.receiverId],
      });
      const result = await newChat.save();

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUser: async (req, res) => {
    try {
      const chat = await Chat.find({
        member: { $in: [req.params.userId] },
      });

      res.status(200).json(chat);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getChat: async (req, res) => {
    try {
      const chat = await Chat.find({
        member: { $all: [req.params.firstId, req.params.secondId] },
      });
      res.status(200).json(chat);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = chatController;
