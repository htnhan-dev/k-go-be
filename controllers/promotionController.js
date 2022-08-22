const { Promotion } = require("../models/model");

const promotionController = {
  addPromotion: async (req, res) => {
    try {
      const newPromotion = new Promotion(req.body);
      const savedPromotion = await newPromotion.save();
      res.status(200).json(savedPromotion);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getPromotion: async (req, res) => {
    try {
      const promotions = await Promotion.find();
      res.status(200).json(promotions);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = promotionController;
