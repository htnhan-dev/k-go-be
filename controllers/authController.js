const bcrypt = require("bcrypt");
const User = require("../models/user");
const Chat = require("../models/chat");
const Notification = require("../models/notification");

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

  approveUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      const changeStatus = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: { isOwner: !user.isOwner },
        }
      );
      const listUser = await User.find();
      res.status(200).json(listUser);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  //get all
  getAllUser: async (req, res) => {
    try {
      const userList = await User.find();
      res.status(200).json(userList);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findOneAndRemove({ _id: id });
      const listUser = await User.find();
      res.status(200).json(listUser);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  // get one User
  getDetailUser: async (req, res) => {
    try {
      const id = req.params.id;
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

  updatePassword: async (req, res) => {
    try {
      const id = req.body.id;
      const userData = await User.findById(id);

      const validPassword = await bcrypt.compare(
        req.body.passwordOld,
        userData.password
      );
      if (!validPassword) {
        return res.status(200).json("Wrong password");
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.passwordNew, salt);
        const updatePass = await User.findByIdAndUpdate(
          { _id: id },
          { $set: { password: hashed } }
        );
      }

      res.status(200).json("Change Password Success !");
    } catch (err) {
      res.status(200).json(err);
    }
  },

  updateAvatar: async (req, res) => {
    try {
      const id = req.body.id;

      const path = req.file.path;

      const updateAvatar = await User.findByIdAndUpdate(
        { _id: id },
        {
          $set: { avatar: path },
        }
      );
      const userData = await User.findById(id);

      res.status(200).json(userData);
    } catch (err) {
      res.status(200).json(err);
    }
  },

  // Follow Func
  followUser: async (req, res) => {
    try {
      // Followwing - Danh sach theo doi cua tai khoan
      // Follower - Danh sach nguoi theo doi tai khoan

      const idFollow = req.body.follow;
      const idFollower = req.body.follower;

      // get info User
      const userFollow = await User.findById(idFollow);

      // get info User Follower
      const userFollower = await User.findById(idFollower);

      await User.findOneAndUpdate(
        { _id: idFollow },
        {
          $push: {
            following: {
              _id: userFollower._id,
              userName: userFollower.userName,
              email: userFollower.email,
              avatar: userFollower.avatar,
            },
          },
        },
        { safe: true, multi: false }
      );
      await User.findOneAndUpdate(
        {
          _id: idFollower,
        },
        {
          $push: {
            follower: {
              _id: userFollow._id,
              userName: userFollow.userName,
              email: userFollow.email,
              avatar: userFollow.avatar,
            },
          },
        }
      );

      const newChat = new Chat({
        member: [idFollow, idFollower],
      });
      newChat.save();

      const textNoti = `${userFollow.userName} vừa theo dõi bạn`;

      const newNoti = new Notification({
        sender: {
          _id: userFollow._id,
          userName: userFollow.userName,
          avatar: userFollow.avatar,
        },
        receiver: {
          _id: userFollower._id,
          userName: userFollower.userName,
          avatar: userFollower.avatar,
        },
        content: textNoti,
      });

      newNoti.save();

      await User.find()
        .then((response) => {
          res.status(200).json({ message: "Success", data: response });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {
      console.log("err: ", err);
      res.status(500).json(err);
    }
  },

  unFollowUser: async (req, res) => {
    try {
      const idFollow = req.body.follow;
      const idFollower = req.body.follower;

      // get info User
      const userFollow = await User.findById(idFollow);

      // get info User Follower
      const userFollower = await User.findById(idFollower);

      await User.findOneAndUpdate(
        { _id: idFollow },
        {
          $pull: {
            following: {
              _id: userFollower._id,
            },
          },
        },
        { safe: true, multi: false }
      );
      await User.findOneAndUpdate(
        {
          _id: idFollower,
        },
        {
          $pull: {
            follower: {
              _id: userFollow._id,
            },
          },
        }
      );

      await Chat.findOneAndDelete({
        member: { $all: [idFollow, idFollower] },
      });

      await User.find()
        .then((response) => {
          res.status(200).json({ message: "Success", data: response });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {
      console.log("err: ", err);
      res.status(500).json(err);
    }
  },

  getNotification: async (req, res) => {
    try {
      const idUser = req.query.id;
      await Notification.find({ "receiver._id": idUser })
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

  readNotification: async (req, res) => {
    try {
      const id = req.query.id;
      const idUser = req.query.idUser;
      await Notification.findOneAndUpdate({ _id: id }, { status: true });

      await Notification.find({ "receiver._id": idUser })
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {}
  },
};

module.exports = authController;
