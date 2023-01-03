const CoffeeShop = require("../models/coffeeShop");
const Category = require("../models/category");
const District = require("../models/district");

const coffeeShopController = {
  // POST coffee shop
  addCoffeeShop: async (req, res) => {
    try {
      const idCategory = req.body.category;
      const listCategory = await Category.findById(idCategory);
      const idDistrict = req.body.district;
      const listDistrict = await District.findById(idDistrict);
      console.log("listCategory: ", listCategory);
      const newCoffee = await new CoffeeShop({
        name: req.body.name,
        address: req.body.address,
        district: req.body.district,
        direct: {
          _id: listDistrict._id,
          title: listDistrict.name,
        },
        category: {
          _id: listCategory._id,
          title: listCategory.name,
        },
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
      console.log("savedCoffee: ", savedCoffee);
      res.status(200).json(savedCoffee);
    } catch (err) {
      console.log("err: ", err);
      res.status(200).json(err);
    }
  },

  // GET coffee shop
  getCoffeeShop: async (req, res) => {
    try {
      const coffeeShops = await CoffeeShop.find({ status: true });
      res.status(200).json(coffeeShops);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getApprovalCoffeeShop: async (req, res) => {
    try {
      const coffeeShops = await CoffeeShop.find({ status: false });
      res.status(200).json(coffeeShops);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //getDetail
  getDetailCoffeeShop: async (req, res) => {
    try {
      const slug = req.query.slug;
      await CoffeeShop.findOne({ slug: slug })
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {
      res.status(200).json(err);
    }
  },

  approveCoffeeShop: async (req, res) => {
    try {
      const listID = req.body.listTD;
      console.log("listID: ", listID);
      await CoffeeShop.updateMany(
        { _id: { $in: listID } },
        { $set: { status: true } }
      );
      await CoffeeShop.find({ status: false })
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {
      res.status(500).json(err);
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
      const { listCategory } = req.body;
      await CoffeeShop.find({ category: { $in: JSON.parse(listCategory) } })

        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {
      res.status(200).json(err);
    }
  },

  getByDistrict: async (req, res) => {
    try {
      const { listDistrict } = req.body;
      await CoffeeShop.find({ district: { $in: JSON.parse(listDistrict) } })
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {
      console.log("err: ", err);
    }
  },

  getByType: async (req, res) => {
    try {
      const { listType } = req.body;
      await CoffeeShop.find({ type: { $in: JSON.parse(listType) } })

        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {
      res.status(200).json(err);
    }
  },

  getByUtilities: async (req, res) => {
    try {
      const { listUtilities } = req.body;
      await CoffeeShop.find({ utilities: { $in: JSON.parse(listUtilities) } })

        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {
      res.status(200).json(err);
    }
  },

  filterCoffeeShop: async (req, res) => {
    try {
      const districts = req.body.districts;

      const categories = req.body.categories;

      console.log("categories: ", categories);

      const types = req.body.types;
      console.log("types: ", types);
      const handys = req.body.handys;
      console.log("handys: ", handys);

      // if (districts) {
      //   await CoffeeShop.find({
      //     district: { $in: districts },
      //   })
      //     .then((response) => {
      //       res.status(200).json(response);
      //     })
      //     .catch((err) => {
      //       res.status(500).json(err);
      //     });
      // }

      // if (types && !districts && !categories && !handys) {
      //   await CoffeeShop.find({
      //     type: { $in: types },
      //   })
      //     .then((response) => {
      //       res.status(200).json(response);
      //     })
      //     .catch((err) => {
      //       res.status(500).json(err);
      //     });
      // }

      // if (handys && !districts && !categories && !types) {
      //   await CoffeeShop.find({
      //     utilities: { $in: handys },
      //   })
      //     .then((response) => {
      //       res.status(200).json(response);
      //     })
      //     .catch((err) => {
      //       res.status(500).json(err);
      //     });
      // }
      if (districts) {
        await CoffeeShop.find({
          district: { $in: districts },
        })
          .then((response) => {
            res.status(200).json(response);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      } else {
        await CoffeeShop.find()
          .then((response) => {
            res.status(200).json(response);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      }

      // if (districts && categories && types) {
      //   await CoffeeShop.find({
      //     district: { $in: districts },
      //     type: { $in: types },
      //     category: { $in: categories },
      //   })
      //     .then((response) => {
      //       res.status(200).json(response);
      //     })
      //     .catch((err) => {
      //       res.status(500).json(err);
      //     });
      // }

      // if (districts && categories && types && handys) {
      //   await CoffeeShop.find({
      //     district: { $in: districts },
      //     type: { $in: types },
      //     category: { $in: categories },
      //     utilities: { $in: handys },
      //   })
      //     .then((response) => {
      //       res.status(200).json(response);
      //     })
      //     .catch((err) => {
      //       res.status(500).json(err);
      //     });
      // }
    } catch (err) {
      console.log("err: ", err);
      res.status(500).json(err);
    }
  },
};

module.exports = coffeeShopController;
