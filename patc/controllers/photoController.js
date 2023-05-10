const fs = require("fs");
const Photo = require("../models/Photo");
const path = require("path");
const parentParentPath = path.join(__dirname, "..");

exports.getAllPhotos = async (req, res) => {
  const photos = await Photo.find().sort("-dateCreated");
  res.render(`${parentParentPath}/views/index.ejs`, {
    photos,
  });
};
exports.getPhoto = async (req, res) => {
  let photo = await Photo.findById(req.params.id);
  res.render(parentParentPath + "/views/photo", {
    photo,
  });
};
exports.createPhoto = async (req, res) => {
  await Photo.create(req.body);
  const uploadDir = parentParentPath + "/public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadeImage = req.files.photo;
  let uploadPath = uploadDir + "/" + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadeImage.name,
    });
    res.redirect("/");
  });
};

exports.updatePhoto = async (req, res) => {
  const id = req.params.id;
  const uploadDir = parentParentPath + "/public/uploads";
  let uploadeImage = req.files.photo;
  let uploadPath = uploadDir + "/" + uploadeImage.name;
  let photo;
  uploadeImage.mv(uploadPath, async () => {
    photo = await Photo.findByIdAndUpdate(id, {
      ...req.body,
      image: "/uploads/" + uploadeImage.name,
    });
    res.render(parentParentPath + "/views/photo", {
      photo,
    });
  });
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  let deletedImage = parentParentPath + "/public" + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);

  res.redirect("/");
};
