const mongoose = require("mongoose")
const Joi = require("@hapi/joi")

const validateTask = task => {
   const schema = Joi.object().keys({
      userid:Joi.string().required(),
      projectid:Joi.string().required(),
      name:Joi.string().required(),
      priority:Joi.number(),
      // startdate:Joi.date(),
      // enddate:Joi.date(),
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
   priority:{type:Number},
   // startdate:{type:Date},
   // enddate:{type:Date},
   messageid:[{type:mongoose.Schema.Types.ObjectId, ref:"message"}],
   status:{type:String,default:"not Started"}
})

const Task = mongoose.model("task", taskSchema);

module.exports = {
   validateTask,
   Task
}