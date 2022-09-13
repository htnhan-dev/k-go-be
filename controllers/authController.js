const bcrypt = require("bcrypt");
const User = require("../models/user");

const authController = {
  // Register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // Create user
      const newUser = await new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashed,
        phoneNumber: null,
        socialList: [],
        following: [],
        follower: [],
        avatar: null,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  //login
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(200).json("Wrong email");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(200).json("Wrong password");
      }

      if (user && validPassword) {
        return res.status(200).json(user);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // get one User
  getDetailUser: async (req, res) => {
    try {
      const id = req.body.id;
      const userData = await User.findById(id);
      res.status(200).json(userData);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  //update NameUser
  updateName: async (req, res) => {
    try {
      const id = req.body.id;
      const userName = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { userName: req.body.userName } }
      );
      const result = await User.findById(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  updateEmail: async (req, res) => {
    try {
      const id = req.body.id;
      const userData = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { email: req.body.email } }
      );
      const result = await User.findById(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  updatePhone: async (req, res) => {
    try {
      const id = req.body.id;
      const userData = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { phoneNumber: req.body.phone } }
      );
      const result = await User.findById(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(200).json(err);
    }
  },
};

module.exports = authController;
