const mongoose = require("mongoose")
const Joi = require("@hapi/joi")

const validateTask = task => {
   const schema = Joi.object().keys({
      userid:Joi.string().required(),
      projectid:Joi.string().required(),
      name:Joi.string().required(),
      priority:Joi.number().required(),
      messageid:Joi.string(),
      status:Joi.string()
   })
   return schema.validate(task);
}

const taskSchema = new mongoose.Schema({
   userid:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
   projectid:{type:mongoose.Schema.Types.ObjectId, ref:"project", required:true},
   name:{type:String, required:true},
   priority:{type:Number, required:true},
   messageid:[{type:mongoose.Schema.Types.ObjectId, ref:"message"}],
   status:{type:String}
})

const Task = mongoose.model("task", taskSchema);

module.exports = {
   validateTask,
   Task
}