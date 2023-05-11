const Photo = require("../models/Photo");
const path = require("path");
const parentParentPath = path.join(__dirname, "..");
exports.getAbout = (req, res) => {
  const currentPage = req.url;
  res.render(parentParentPath + "/views/about", {
    currentPage,
  });
};
exports.getNewPhoto = (req, res) => {
  const currentPage = req.url;
  res.render(parentParentPath + "/views/add", {
    currentPage,
  });
};
exports.editPhoto = async (req, res) => {
  const currentPage = req.url;
  const id = req.params.id;
  const photo = await Photo.findById(id);
  res.render(parentParentPath + "/views/edit", {
    photo,
    currentPage,
  });
};
