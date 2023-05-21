const User = require("../models/User");
const Category = require("../models/Category");

const bcrypt = require("bcrypt");
const Course = require("../models/Course");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).redirect("/");
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors);
    console.log(errors.array()[0].msg);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg}`);
    }

    res.status(400).redirect("/");
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
        req.flash("error", "Your password is not correct!");
        res.status(400).redirect("/");
      });
    } else {
      req.flash("error", "User is not exist!");
      res.status(400).redirect("/");
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
  const users = await User.find();
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "courses"
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID }).populate(
    "category"
  );
  res.status(200).render("dashboard", {
    pageName: "dashboard",
    user,
    users,
    categories,
    courses,
  });
};
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    await Course.deleteMany({ user: req.params.id });
    req.flash("error", `${user.name} has been deleted.`);
    res.status(200).redirect("/user/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
