const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const validateUser = user => {
   const schema = Joi.object.keys({
      name:Joi.string().required(),
      email:Joi.string().email().required(),
      teamid:Joi.string(),
      taskid:Joi.string(),
      projectid:Joi.string(),
   })
   return Joi.validate(user, schema);
}

const userSchema = new mongoose.Schema({
   name: {type:String, required:true},
   email:{type:String, required:true},
   teamid:{type:mongoose.Schema.Types.ObjectId, ref:"team"},
   taskid:[{type:mongoose.Schema.Types.ObjectId, ref:"task"}],
   projectid:{type:mongoose.Schema.Types.ObjectId, ref:"project"}
})

const user = mongoose.model("user", userSchema);

module.exports = {
   validateUser,
   user
}