var nodemailer = require("nodemailer");
const app = require('../../main')
const User = require("../../db/models/user");

const register = (req, res) => {
  const { firstName, gender, email, password } = req.body;
  const user = new User({
    firstName,
    email,
    gender,
    password,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `User Created Successfully`,
        User: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  User.findById({ _id: id })
    .populate("followers")
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `the user with id =>${id}`,
        posts: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error",
        err: err,
      });
    });
};

const follwoUnfollwo = (req, res) => {
  const _id = req.params.id;

  const curruntuser = req.token.userId;

  User.findById(curruntuser).then((result) => {
    if (!result.followers.includes(_id)) {
      User.updateOne(
        { _id: curruntuser },
        { $push: { followers: _id } }
      ).exec();
      res.status(200).json("follow sccesfully");
    } else {
      User.updateOne(
        { _id: curruntuser },
        { $pull: { followers: _id } }
      ).exec();
      res.status(200).json("unfollow sccesfully");
    }
  });
};

const checkIsFollower = (req, res) => {
  const _idU = req.token.userId;
  const _idF = req.params.idF;
  User.findById(_idU)
    .then((result) => {
      if (result.followers.includes(_idF)) {
        return res.status(200).json({
          success: true,
          message: `User of id: ${_idF} is following User of id: ${_idU}`,
        });
      }
      res.status(201).json({
        success: false,
        message: `User of id: ${_idF} is NOT FOLLOWING User of id: ${_idU}`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error Mraish`,
        err: err,
      });
    });
};
const updateUserById = (req, res) => {
  const { lastName, age, email, gender, avatar } = req.body;
  console.log("reqbody",req.body)
  const _id = req.params.id;
  User.findByIdAndUpdate(
    { _id: _id },
    {
      $push: { album: avatar },
      avatar: avatar,
      gender: gender,
      email: email,
      age: age,
      lastName: lastName,
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The User => ${_id} not found`,
        });
      }
      console.log("mrs mai",result)
      res.status(200).json({
        success: true,
        message: `The post with ${_id}`,
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error",
        err: err,
      });
    });
};

const searchUsersByName = (req, res) => {
  const name = req.query.name;
  User.find({
    $or: [
      {
        firstName: {
          $regex: name,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: name,
          $options: "i",
        },
      },
    ],
  })
    .then((result) => {
      if (!result.length) {
        return res.status(400).json({
          success: false,
          message: "Name doesn't exist",
        });
      }
      res.status(200).json({
        success: true,
        users: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

module.exports = {
  getUserById,
  register,
  follwoUnfollwo,
  searchUsersByName,
  updateUserById,
  checkIsFollower,
};
