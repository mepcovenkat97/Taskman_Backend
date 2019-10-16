const mongoose = require("mongoose")
const Joi = require("@hapi/joi")

const validateTask = task => {
   const schema = Joi.object().keys({
      userid:Joi.string().required(),
      projectid:Joi.string().required(),
      name:Joi.string().required(),
      startdate:Joi.date().required(),
      enddate:Joi.date().required(),
      priority:Joi.number(),
   })
   return schema.validate(task);
}

const taskSchema = new mongoose.Schema({
   userid:{
      type:mongoose.Schema.Types.ObjectId, 
      ref:"user", 
      required:true
   },
   projectid:{
      type:mongoose.Schema.Types.ObjectId, 
      ref:"project", 
      required:true
   },
   name:{type:String, required:true},
   startdate:{type:Date,default:Date.now},
   enddate:{type:Date},
   priority:{type:Number},
   messageid:[{type:mongoose.Schema.Types.ObjectId, ref:"message"}],
   status:{type:String}
})

const Task = mongoose.model("task", taskSchema);

module.exports = {
   validateTask,
   Task
}