const express = require("express");
const path = require("path");
const ejs = require("ejs");
const Post = require("./models/Post");

const app = express();
const port = 8081;
const publicPath = path.join(__dirname, "public");

// engine templates
app.set("view engine", "ejs");

//middlewares
app.use("/public", express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("/home/elnur/Desktop/nodejs-notcode/clean-blog/views/index", {
    posts,
  });
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
app.post("/addpost", async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
});
app.get("/post/:id", async (req, res) => {
  let post = await Post.findById(req.params.id);
  res.render("/home/elnur/Desktop/nodejs-notcode/clean-blog/views/post", {
    post
  })
});

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
