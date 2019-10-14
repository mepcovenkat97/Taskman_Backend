const mongoose = require("mongoose")
const Joi = require("@hapi/joi")

const validateMessage = message =>{
   const schema = Joi.object().keys({
      content:Joi.string().required(),
      userid:Joi.string().required(),
      taskid:Joi.string().required(),
      //projectid:Joi.string().required()
   })
   return schema.validate(message);
}

const messageSchema = new mongoose.Schema({
   content:{type:String, required:true},
   userid:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
   taskid:{type:mongoose.Schema.Types.ObjectId, ref:"task"},
  // projectid:{type:mongoose.Schema.Types.ObjectId, ref:"project"}
})

const Message = mongoose.model("message", messageSchema);

module.exports = {
   validateMessage,
   Message
}