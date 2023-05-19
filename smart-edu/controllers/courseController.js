const Course = require("../models/Course")

exports.createCourse= async(req,res)=>{
    const course = await Coourse.create(req.body)
    try{
        res.status(201).json({
            status:"success",
            course: course
        })
    }
    catch (error){
        res.status(200).json({
            status:"fail",
            error: error
        })
    }

}