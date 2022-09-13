const CoffeeShop = require("../models/coffeeShop");

const coffeeShopController = {
  // POST coffee shop
  addCoffeeShop: async (req, res) => {
    console.log("req: ", req.type);
    try {
      const newCoffee = new CoffeeShop({
        name: req.body.name,
        address: req.body.address,
        district: req.body.district,
        direct: req.body.direct,
        description: req.body.description,
        contact: JSON.parse(req.body.contact),
        isBoss: req.body.isBoss,
        services: JSON.parse(req.body.services),
        type: JSON.parse(req.body.type),
        utilities: JSON.parse(req.body.utilities),
        slug: req.body.slug,
      });

      if (req.files) {
        let libImage = [];
        let libMenu = [];
        let path = "";
        req.files.forEach(function (files, index, arr) {
          if (files.fieldname === "libraryImg[]") {
            path = files.path;
            libImage.push(path);
          }
          if (files.fieldname === "libraryMenu[]") {
            path = files.path;
            libMenu.push(path);
          }
        });
        newCoffee.libraryImg = libImage;
        newCoffee.libraryMenu = libMenu;
      }

      const savedCoffee = await newCoffee.save();
      res.status(200).json(savedCoffee);
    } catch (err) {
      res.status(200).json(err);
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
