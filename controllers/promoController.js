const Promo = require("../models/promo");
const CoffeeShop = require("../models/coffeeShop");

const promoController = {
  // add
  addPromo: async (req, res) => {
    try {
      const placePromo = await CoffeeShop.findById(req.body.place);
      const newPromo = await new Promo({
        name: req.body.name,
        description: req.body.description,
        voucher: req.body.voucher,
        place: placePromo.name,
        address: placePromo.address,
      });

      if (req.file) {
        newPromo.thumnail = req.file.path;
      }

      const savedPromo = await newPromo.save();

      res.status(200).json(savedPromo);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  //getAll
  showPromo: async (req, res) => {
    try {
      const show = await Promo.find();
      res.status(200).json(show);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  getDetail: async (req, res) => {
    try {
      const id = req.params.id;
      console.log("id: ", id);
      const data = await Promo.findById(id);
      res.status(200).json(data);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  updatePromo: async (req, res) => {
    try {
      const id = req.body.id;

      if (req.file) {
        const data = await Promo.findOneAndUpdate(
          { _id: id },
          {
            name: req.body.name,
            description: req.body.description,
            thumnail: req.file.path,
            voucher: req.body.voucher,
            place: req.body.place,
          }
        );
      } else {
        const data = await Promo.findOneAndUpdate(
          { _id: id },
          {
            name: req.body.name,
            description: req.body.description,
            voucher: req.body.voucher,
            place: req.body.place,
          }
        );
      }

      const promo = await Promo.findById(id);
      const placePromo = await CoffeeShop.findById(req.body.place);
      res.status(200).json({ promo: promo, coffeeShop: placePromo });
    } catch (err) {
      res.status(200).json(err);
    }
  },

  deletePromo: async (req, res) => {
    try {
      const id = req.params.id;
      const remove = await Promo.findOneAndRemove({ _id: id });
      const data = await Promo.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(200).json(err);
    }
  },
};

module.exports = promoController;
