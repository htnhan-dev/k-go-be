const { CoffeeShop } = require("../models/model");

const coffeeShopController = {
  // POST coffee shop
  addCoffeeShop: async (req, res) => {
    try {
      const newCoffee = new CoffeeShop(req.body);
      const savedCoffee = await newCoffee.save();
      res.status(200).json(savedCoffee);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET coffee shop
  getCoffeeShop: async (req, res) => {
    try {
      const coffeeShops = await CoffeeShop.find();
      res.status(200).json(coffeeShops);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = coffeeShopController;
