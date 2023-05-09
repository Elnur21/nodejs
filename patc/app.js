const express = require("express");
const path = require("path");
const ejs = require("ejs");
const Photo = require("./models/Photo")


const app = express();
const port = 8080;
// template engine
app.set("view engine", "ejs");

//middlewares
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/", async (req, res) => {
  const photos = await Photo.find();
  res.render("/home/elnur/Desktop/nodejs-notcode/patc/views/index",{
    photos
  });
});
app.get("/about", (req, res) => {
  res.render("/home/elnur/Desktop/nodejs-notcode/patc/views/about");
});
app.get("/add", (req, res) => {
  res.render("/home/elnur/Desktop/nodejs-notcode/patc/views/add");
});
app.post("/photos", async(req, res) => {
  await Photo.create(req.body);
  res.redirect("/");
});

//port listen
app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
