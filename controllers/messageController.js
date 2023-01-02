const Message = require("../models/message");

const messageController = {
  addMessage: async (req, res) => {
    try {
      const { chatId, senderId, text, type } = req.body;
      let libImage = [];
      if (req.files) {
        req.files.forEach(function (files, index, arr) {
          path = files.path;
          libImage.push(path);
        });
      }

      const newMessage = new Message({
        chatId,
        senderId,
        text,
        images: libImage,
        type,
      });

      // const newMessage = new Message({
      //   chatId,
      //   senderId,
      //   text,
      //   type,
      // });

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
