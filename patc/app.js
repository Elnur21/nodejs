const express = require("express");
const path = require("path");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");

const photoController = require("./controllers/photoController");
const pageController = require("./controllers/pageController");

const app = express();
const port = 8080;
// const port = process.env.PORT || 8080;
// template engine
app.set("view engine", "ejs");

//middlewares
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

//routes
app.get("/", photoController.getAllPhotos);
app.post("/photos", photoController.createPhoto);
app.post("/update/:id", photoController.updatePhoto);
app.get("/delete/:id", photoController.deletePhoto);
app.get("/photos/:id", photoController.getPhoto);

app.get("/about", pageController.getAbout);
app.get("/add", pageController.getNewPhoto);
app.get("/edit/:id", pageController.editPhoto);

//port listen
app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
