const User = require("../models/User");
const Category = require("../models/Category");

const bcrypt = require("bcrypt");
const Course = require("../models/Course");

exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);

    // res.status(201).json({
    //   status: "success",
    //   user,
    // });
    res.status(201).redirect("/");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (err) {
          // Handle the error
          return res.status(500).json({
            status: "error",
            message: "Error comparing passwords",
          });
        }
        if (same) {
          req.session.userID = user._id;
          return res.status(200).redirect("/user/dashboard");
        }
        // Handle incorrect password case
        return res.status(401).json({
          status: "fail",
          message: "Incorrect password",
        });
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  const categories = await Category.find();
  const courses = await Course.find({user:req.session.userID})
  res.status(200).render("dashboard", {
    pageName: "dashboard",
    user,
    categories,
    courses
  });
};
