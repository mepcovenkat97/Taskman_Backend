const mongoose = require("mongoose")
const Joi = require("@hapi/joi")

const validateProject = project => {
   const schema = Joi.object().keys({
      title:Joi.string().required(),
      startdate:Joi.date().required(),
      enddate:Joi.date().required(),
      workspaceid:Joi.string().required(),
      userid:Joi.string().optional(),
      teamid:Joi.string().optional(),
      status:Joi.string().optional()
   })
   return schema.validate(project);
}

const projectSchema = new mongoose.Schema({
   title:{type:String, required:true},
   workspaceid:{type:mongoose.Schema.Types.ObjectId, ref:"workspace"},
   startdate:{type:Date,default:Date.now},
   enddate:{type:Date},
   userid:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
   teamid:{type:mongoose.Schema.Types.ObjectId, ref:"team"},
   taskid:[{type:mongoose.Schema.Types.ObjectId, ref:"task"}],
   status:{type:String,default:"not Started"}
})

const Project = mongoose.model("project", projectSchema);

module.exports={
   validateProject,
   Project
}