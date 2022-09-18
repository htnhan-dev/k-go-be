const Category = require("../models/category");

const categoryController = {
  // add
  addCategory: async (req, res) => {
    try {
      const newCategory = await new Category({
        name: req.body.name,
        description: req.body.description,
        slug: req.body.slug,
      });

      if (req.file) {
        newCategory.thumnail = req.file.path;
      }

      const savedCategory = await newCategory.save();

      res.status(200).json(savedCategory);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  //getAll
  showCategory: async (req, res) => {
    try {
      const show = await Category.find();
      res.status(200).json(show);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  getDetail: async (req, res) => {
    console.log("req: ", req);
    try {
      const id = req.params.id;
      console.log("id: ", id);
      const data = await Category.findById(id);
      res.status(200).json(data);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  updateCategory: async (req, res) => {
    try {
      const id = req.body.id;

      if (req.file) {
        const data = await Category.findOneAndUpdate(
          { _id: id },
          {
            name: req.body.name,
            description: req.body.description,
            thumnail: req.file.path,
            slug: req.body.slug,
          }
        );
      } else {
        const data = await Category.findOneAndUpdate(
          { _id: id },
          {
            name: req.body.name,
            description: req.body.description,
            slug: req.body.slug,
          }
        );
      }

      const category = await Category.findById(id);
      res.status(200).json(category);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const remove = await Category.findOneAndRemove({ _id: id });
      const data = await Category.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(200).json(err);
    }
  },
};

module.exports = categoryController;
