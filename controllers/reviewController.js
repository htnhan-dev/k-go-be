const Review = require("../models/review");
const CoffeeShop = require("../models/coffeeShop");
const User = require("../models/user");

const reviewController = {
  addReview: async (req, res) => {
    console.log("req: ", req.body);
    try {
      const user = await User.findById(req.body.iduser);

      const place = await CoffeeShop.findById(req.body.idplace);

      const newReview = await Review({
        title: req.body.title,
        description: req.body.description,
        iduser: req.body.iduser,
        nameuser: user.userName,
        avatar: user.avatar,
        idplace: req.body.idplace,
        place: place.name,
        slugPlace: place.slug,
        rating: JSON.parse(req.body.rating),
      });

      if (req.files) {
        let libImage = [];
        let path = "";
        req.files.forEach(function (files, index, arr) {
          path = files.path;
          libImage.push(path);
        });
        newReview.libraryImg = libImage;
      }

      const savedReview = await newReview.save();
      console.log("savedReview: ", savedReview);

      if (req.body.isOwner === "true") {
        const check = await Review.findOneAndUpdate(
          { _id: savedReview._id },
          {
            $set: { isOwner: !savedReview.isOwner },
          }
        );
        // console.log("check: ", check);
      }

      res.status(200).json(savedReview);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  likeReview: async (req, res) => {
    try {
      const idUser = req.query.idUser;
      const idPost = req.query.idPost;
      const typeLike = req.query.type;
      const userInfo = await User.findById(idUser);
      await Review.findOneAndUpdate(
        { _id: idPost },
        {
          $push: {
            like: {
              idUser: userInfo._id,
              userName: userInfo.userName,
              avatar: userInfo.avatar,
              typeLike: Number(typeLike),
            },
          },
        }
      );
      await Review.find()
        .sort({ createdAt: -1 })
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

  likeProfileReview: async (req, res) => {
    try {
      const id = req.params.id;
      const like = await Review.findOneAndUpdate(
        { _id: id },
        { $inc: { like: 1 } }
      );
      const review = await Review.findById(id);
      const listReview = await Review.find({ iduser: review.iduser }).sort({
        createdAt: -1,
      });
      res.status(200).json(listReview);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  unLikeReview: async (req, res) => {
    try {
      const idUser = req.query.idUser;
      const idPost = req.query.idPost;
      const userInfo = await User.findById(idUser);
      await Review.findOneAndUpdate(
        { _id: idPost },
        {
          $pull: {
            like: {
              idUser: userInfo._id,
            },
          },
        }
      );
      await Review.find()
        .sort({ createdAt: -1 })
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

  unLikeProfileReview: async (req, res) => {
    try {
      const id = req.params.id;
      const like = await Review.findOneAndUpdate(
        { _id: id },
        { $inc: { like: -1 } }
      );
      const review = await Review.findById(id);
      const listReview = await Review.find({ iduser: review.iduser }).sort({
        createdAt: -1,
      });
      res.status(200).json(listReview);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  commentReview: async (req, res) => {
    try {
      const id = req.body.id;

      const review = await Review.findOneAndUpdate(
        { _id: id },
        {
          $push: { comment: req.body.item },
        }
      );

      const reviewList = await Review.find().sort({ createdAt: -1 });

      res.status(200).json(reviewList);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  commentProfileReview: async (req, res) => {
    try {
      const id = req.body.id;

      const review = await Review.findOneAndUpdate(
        { _id: id },
        {
          $push: { comment: req.body.item },
        }
      );
      const reviews = await Review.findById(id);
      const reviewList = await Review.find({ iduser: reviews.iduser }).sort({
        createdAt: -1,
      });

      res.status(200).json(reviewList);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  getAllReview: async (req, res) => {
    try {
      const review = await Review.find().sort({ createdAt: -1 });
      res.status(200).json(review);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  detailReview: async (req, res) => {
    try {
      const { idReview } = req.query;
      await Review.findOne({ _id: idReview })
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

  userReview: async (req, res) => {
    try {
      const idUser = req.params.id;
      const review = await Review.find({ iduser: idUser }).sort({
        createdAt: -1,
      });
      res.status(200).json(review);
    } catch (err) {
      res.status(200).json(200);
    }
  },

  placeReview: async (req, res) => {
    try {
      const slug = req.query.slug;
      await Review.find({ slugPlace: slug })
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {
      ers.status(200).json(err);
    }
  },

  getReviewFollow: async (req, res) => {
    try {
      const idUser = req.query.idUser;
      const profile = await User.findById(idUser);
      const listID = [];
      profile.following.forEach((item) => {
        let user = item._id;
        listID.push(user);
      });
      await Review.find({ iduser: { $in: listID } })
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          console.log("err: ", err);
          res.status(500).json(err);
        });
    } catch (err) {
      console.log("err: ", err);
      res.status(500).json(err);
    }
  },
};

module.exports = reviewController;
