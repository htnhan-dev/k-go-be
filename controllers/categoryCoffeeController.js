const { CategoryCoffee } = require("../models/model");

const categoryCoffeeController = {
  // POST Category Coffee
  addCategoryCoffee: async (req, res) => {
    try {
      const newCategoryCoffee = new CategoryCoffee(req.body);
      const savedCategoryCoffee = await newCategoryCoffee.save();
      res.status(200).json(savedCategoryCoffee);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET Category Coffee {
  getCategoryCoffee: async (req, res) => {
    try {
      const categoryCoffees = await CategoryCoffee.find();
      res.status(200).json(categoryCoffees);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = categoryCoffeeController;
