const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    description:{
        type: String,
        required: true,
        trim:true
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Course = mongoose.model("Course", CourseSchema);
  
  module.exports = Course;