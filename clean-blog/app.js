const express = require("express");
const path = require("path");
const ejs = require("ejs");

const app = express();
const port = 8081;
app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("/home/elnur/Desktop/nodejs-notcode/clean-blog/views/index");
});
app.get("/about", (req, res) => {
  res.render("/home/elnur/Desktop/nodejs-notcode/clean-blog/views/about");
});
app.get("/add", (req, res) => {
  res.render("/home/elnur/Desktop/nodejs-notcode/clean-blog/views/add_post");
});
app.get("/post", (req, res) => {
  res.render("/home/elnur/Desktop/nodejs-notcode/clean-blog/views/post");
});

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
