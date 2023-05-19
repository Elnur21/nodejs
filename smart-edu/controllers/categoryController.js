const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const course = await Category.create(req.body);
    res.status(201).json({
      status: "success",
      course: course,
    });
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
    const course = await Category.findOne({ slug: req.params.slug });
    res.status(200).render("course-single", {
      course,
      pageName: "categories",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error,
    });
  }
};
