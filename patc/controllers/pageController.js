const Photo = require("../models/Photo");
const path = require("path");
const parentParentPath = path.join(__dirname, "..");
exports.getAbout = (req, res) => {
  res.render(parentParentPath + "/views/about");
};
exports.getNewPhoto = (req, res) => {
  res.render(parentParentPath + "/views/add");
};
exports.editPhoto = async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findById(id);
  res.render(parentParentPath + "/views/edit", {
    photo,
  });
};
