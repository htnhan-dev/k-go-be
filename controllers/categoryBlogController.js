const CategoryBlog = require("../models/categoryBlog");
const { updateCategory } = require("./categoryController");

const categoryBlogController = {
  addCategoryBlog: async (req, res) => {
    try {
      const newItem = await new CategoryBlog({
        name: req.body.name,
        description: req.body.description,
      });

      const save = await newItem.save();
      res.status(200).json(save);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  showCategoryBlog: async (req, res) => {
    try {
      const listCategory = await CategoryBlog.find();
      res.status(200).json(listCategory);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  updateCategory: async (req, res) => {
    try {
      const id = req.body.id;

      const data = await CategoryBlog.findOneAndUpdate(
        { _id: id },
        {
          name: req.body.name,
          description: req.body.description,
        }
      );

      const category = await CategoryBlog.findById(id);
      res.status(200).json(category);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const remove = await CategoryBlog.findOneAndRemove({ _id: id });
      const data = await CategoryBlog.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(200).json(err);
    }
  },
};

module.exports = categoryBlogController;
