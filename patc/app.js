const express = require("express");
const path = require("path");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const Photo = require("./models/Photo");

const app = express();
const port = 8080;
// template engine
app.set("view engine", "ejs");

//middlewares
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

//routes
app.get("/", async (req, res) => {
  const photos = await Photo.find().sort("-dateCreated");
  res.render(__dirname + "/views/index", {
    photos,
  });
});

app.get("/about", (req, res) => {
  res.render(__dirname + "/views/about");
});

app.get("/add", (req, res) => {
  res.render(__dirname + "/views/add");
});



app.post("/photos", async (req, res) => {
  await Photo.create(req.body);
  const uploadDir = __dirname + "/public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadeImage = req.files.photo;
  let uploadPath = uploadDir+"/" + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadeImage.name,
    });
    res.redirect("/");
  });
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findById(id)
  res.render(__dirname+"/views/edit",{
    photo
  })
});

app.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  const uploadDir = __dirname + "/public/uploads";
  let uploadeImage = req.files.photo;
  let uploadPath = uploadDir+"/" + uploadeImage.name;
  let photo;
  uploadeImage.mv(uploadPath, async () => {
    photo =await Photo.findByIdAndUpdate(id,{
      ...req.body,
      image: "/uploads/" + uploadeImage.name,
    });
    res.render(__dirname + "/views/photo", {
      photo,
    });
  });
});


app.get("/photos/:id", async (req, res) => {
  let photo = await Photo.findById(req.params.id);
  res.render(__dirname + "/views/photo", {
    photo,
  });
});

//port listen
app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
