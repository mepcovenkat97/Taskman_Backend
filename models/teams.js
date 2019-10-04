const mongoose = require("mongoose")
const Joi = require("@hapi/joi")

const validateTeam = team => {
   const schema = Joi.object().keys({
      name:Joi.string().required(),
      memberslist:Joi.string().required(),
      projectslist:Joi.string().required()
   })
   return schema.validate(team)
}

const teamSchema = new mongoose.Schema({
   name:{type:String, required:true},
   memberslist:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}],
   projectslist:[{type:mongoose.Schema.Types.ObjectId, ref:"project"}],
})

const Team = mongoose.model("team", teamSchema);

module.exports = {
   validateTeam,
   Team
}