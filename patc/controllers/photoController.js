const fs = require("fs");
const Photo = require("../models/Photo");
const path = require("path");
const parentParentPath = path.join(__dirname, "..");
let pictureID = 0;
exports.getAllPhotos = async (req, res) => {
  const currentPage = req.url;
  const page = req.query.page;
  const prevPage = page - 1;
  const nextPage = parseInt(page) + 1;
  const photosPerPage = 1;
  const totalPhotos = await Photo.find().countDocuments();
  const photos = await Photo.find()
    .sort("-dateCreated")
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);
  const numberOfPages = Math.ceil(totalPhotos / photosPerPage);
  res.render(`${parentParentPath}/views/index.ejs`, {
    photos: photos,
    current: page,
    prevPage: prevPage,
    nextPage: nextPage,
    numberOfPages: numberOfPages,
    currentPage: currentPage,
  });
};
exports.getPhoto = async (req, res) => {
  const currentPage = req.url;
  let photo = await Photo.findById(req.params.id);
  res.render(parentParentPath + "/views/photo", {
    photo,
    currentPage,
  });
};
exports.createPhoto = async (req, res) => {
  pictureID += 1;
  const uploadDir = parentParentPath + "/public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadeImage = req.files.photo;
  let uploadPath = uploadDir + "/" + pictureID + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + pictureID + uploadeImage.name,
    });
    res.redirect("/");
  });
};

exports.updatePhoto = async (req, res) => {
  const currentPage = req.url;
  pictureID += 1;
  const id = req.params.id;
  const uploadDir = parentParentPath + "/public/uploads";
  let uploadeImage = req.files.photo;
  let uploadPath = uploadDir + "/" + pictureID + uploadeImage.name;
  let photo;
  uploadeImage.mv(uploadPath, async () => {
    photo = await Photo.findByIdAndUpdate(id, {
      ...req.body,
      image: "/uploads/" + pictureID + uploadeImage.name,
    });
    res.render(parentParentPath + "/views/photo", {
      photo,
      currentPage,
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
