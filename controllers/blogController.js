const Blog = require("../models/blog");

const blogController = {
  addBlog: async (req, res) => {
    try {
      const newBlog = await new Blog({
        name: req.body.name,
        description: req.body.description,
        categoryBlog: req.body.categoryBlog,
      });

      if (req.file) {
        newBlog.thumnail = req.file.path;
      }

      const save = await newBlog.save();
      res.status(200).json(save);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  showBlog: async (req, res) => {
    try {
      const listBlog = await Blog.find();
      res.status(200).json(listBlog);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  getDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await Blog.findById(id);
      res.status(200).json(blog);
    } catch (err) {
      res.status(200).json(err);
    }
  },
  deleteBlog: async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await Blog.findOneAndRemove({ _id: id });
      const listBlog = await Blog.find();
      res.status(200).json(listBlog);
    } catch (err) {
      res.status(200).json(err);
    }
  },
};

module.exports = blogController;
