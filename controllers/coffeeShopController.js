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
        category: req.body.category,
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

  //getDetail
  getDetailCoffeeShop: async (req, res) => {
    try {
      const id = req.body.id;

      const place = await CoffeeShop.findById({ _id: id });
      res.status(200).json(place);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  approveCoffeeShop: async (req, res) => {
    try {
      const id = req.params.id;
      console.log("id: ", id);
      const list = await CoffeeShop.findById(id);
      const place = await CoffeeShop.findOneAndUpdate(
        { _id: id },
        { $set: { status: !list.status } }
      );
      const listPlace = await CoffeeShop.find();
      res.status(200).json(listPlace);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  deleteCoffeeShop: async (req, res) => {
    try {
      const id = req.params.id;
      const coffeeShop = await CoffeeShop.findOneAndRemove({ _id: id });
      const listCoffee = await CoffeeShop.find();
      res.status(200).json(listCoffee);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  getByCategory: async (req, res) => {
    try {
      const cate = req.body.category;
      console.log("cate: ", cate);
      const listPlace = await CoffeeShop.find({ category: cate });
      res.status(200).json(listPlace);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  getByDistrict: async (req, res) => {
    try {
      const dis = req.body.district;
      const placeList = await CoffeeShop.find({ district: dis });
      res.status(200).json(placeList);
    } catch (err) {
      console.log("err: ", err);
    }
  },

  getByType: async (req, res) => {
    try {
      const type = req.body.type;
      const typeList = await CoffeeShop.find({ type: type });
      res.status(200).json(typeList);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  getByUtilities: async (req, res) => {
    try {
      const uti = req.body.uti;
      const utiList = await CoffeeShop.find({ utilities: uti });
      res.status(200).json(utiList);
    } catch (err) {
      res.status(200).json(err);
    }
  },
};

module.exports = coffeeShopController;
