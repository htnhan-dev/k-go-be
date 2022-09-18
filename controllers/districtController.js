const District = require("../models/district");

const dictrictController = {
  // add
  addDictrict: async (req, res) => {
    try {
      const newDictrict = await new District({
        name: req.body.name,
        description: req.body.description,
        slug: req.body.slug,
      });

      if (req.file) {
        newDictrict.thumnail = req.file.path;
      }

      const savedDistrict = await newDictrict.save();
      res.status(200).json(savedDistrict);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  //getAll
  showDistrict: async (req, res) => {
    try {
      const show = await District.find();
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
      const data = await District.findById(id);
      res.status(200).json(data);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  updateDistrict: async (req, res) => {
    try {
      const id = req.body.id;

      if (req.file) {
        const data = await District.findOneAndUpdate(
          { _id: id },
          {
            name: req.body.name,
            description: req.body.description,
            thumnail: req.file.path,
            slug: req.body.slug,
          }
        );
      } else {
        const data = await District.findOneAndUpdate(
          { _id: id },
          {
            name: req.body.name,
            description: req.body.description,
            slug: req.body.slug,
          }
        );
      }

      const district = await District.findById(id);
      res.status(200).json(district);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  deleteDistrict: async (req, res) => {
    try {
      const id = req.params.id;
      const remove = await District.findOneAndRemove({ _id: id });
      const data = await District.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(200).json(err);
    }
  },
};

module.exports = dictrictController;
