const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb+srv://elnurmagerramov:1234@teacherbase.wou1v.mongodb.net/testdb?retryWrites=true&w=majority"
// );
mongoose
  .connect(
    "mongodb+srv://elnurmagerramov:1234@teacherbase.wou1v.mongodb.net/testdb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB database connection successful");
  })
  .catch((err) => {
    console.error("MongoDB database connection error: " + err);
  });
const PhotoSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model("Photo", PhotoSchema);

Photo.create({
  title: "Photo 2",
  description: "Photo 2 description",
});

// Photo.find({})
//   .then((docs) => {
//     console.log(docs);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

Photo.findByIdAndUpdate({_id: "645a7fcca8a3c615006c26da"},{
    title:"Elnurun",
    description:"bilmirem ne yazim"
}).then((docs) => {
    console.log(docs);
  })
  .catch((err) => {
    console.log(err);
  });
// Photo.find({})
//   .then((docs) => {
//     console.log(docs);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
