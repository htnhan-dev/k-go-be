const { Comment } = require("../models/model");

const commentController = {
  addComment: async (req, res) => {
    try {
      const newComment = new Comment(req.body);
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getComment: async (req, res) => {
    try {
      const comments = await Comment.find();
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = commentController;
