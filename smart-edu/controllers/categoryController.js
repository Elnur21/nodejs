const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    req.flash("success", `${category.name} has been added.`);
    res.status(201).redirect("/user/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error,
    });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).render("categories", {
      categories,
      pageName: "categories",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error,
    });
  }
};
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(200).render("course-single", {
      category,
      pageName: "categories",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    await Course.deleteMany({ user: req.params.id });
    req.flash("error", `${category.name} has been deleted.`);
    res.status(200).redirect("/user/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
