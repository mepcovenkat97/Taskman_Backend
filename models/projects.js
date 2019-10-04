const mongoose = require("mongoose")
const Joi = require("@hapi/joi")

const validateProject = project => {
   const schema = Joi.object().keys({
      title:Joi.string().required(),
      workspaceid:Joi.string(),
      teamid:Joi.string(),
      taskid:Joi.string(),
   })
   return schema.validate(project);
}

const projectSchema = new mongoose.Schema({
   title:{type:String, required:true},
   workspaceid:{type:mongoose.Schema.Types.ObjectId, ref:"workspace"},
   startdate:{type:Date,default:Date.now},
   enddate:{type:Date},
   teamid:{type:mongoose.Schema.Types.ObjectId, ref:"team"},
   taskid:[{type:mongoose.Schema.Types.ObjectId, ref:"task"}],
   status:{type:String,default:"incomplete"}
})

const Project = mongoose.model("project", projectSchema);

module.exports={
   validateProject,
   Project
}