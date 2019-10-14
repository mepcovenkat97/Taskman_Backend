const mongoose = require("mongoose")
const Joi = require("@hapi/joi")

const validateTeam = team => {
   console.log(team);
   const schema = Joi.object().keys({
      name:Joi.string().required(),
      userid:Joi.string().required(),
      projectid:Joi.string().required()
   })
   return schema.validate(team)
}

const teamSchema = new mongoose.Schema({
   name:{type:String, required:true},
   userid:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}],
   projectid:[{type:mongoose.Schema.Types.ObjectId, ref:"project"}],
})

const Team = mongoose.model("team", teamSchema);

module.exports = {
   validateTeam,
   Team
}