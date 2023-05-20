const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "success",
      user,
    });
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
        if (same) {
          // will edit
          // res.status(200).send("you are login");
          req.session.userID = user._id;
          res.status(200).redirect("/user/dashboard");
        }
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
  const user = await User.findOne({_id:req.session.userID})
  res.status(200).render("dashboard", {
    pageName: "dashboard",
    user
  });
};