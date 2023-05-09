const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://elnurmagerramov:1234@teacherbase.wou1v.mongodb.net/postsDB?retryWrites=true&w=majority",
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
const PostSchema = new mongoose.Schema({
  name: String,
  subtitle:String,
  message: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
