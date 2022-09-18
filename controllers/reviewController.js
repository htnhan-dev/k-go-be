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
      const id = req.params.id;
      const like = await Review.findOneAndUpdate(
        { _id: id },
        { $inc: { like: 1 } }
      );
      const review = await Review.findById(id);
      const listReview = await Review.find().sort({ createdAt: -1 });
      res.status(200).json(listReview);
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
      const id = req.params.id;
      const like = await Review.findOneAndUpdate(
        { _id: id },
        { $inc: { like: -1 } }
      );
      const listReview = await Review.find().sort({ createdAt: -1 });
      res.status(200).json(listReview);
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
      const id = req.params.id;
      const reviewList = await Review.find({ idplace: id });
      res.status(200).json(reviewList);
    } catch (err) {
      ers.status(200).json(err);
    }
  },
};

module.exports = reviewController;
