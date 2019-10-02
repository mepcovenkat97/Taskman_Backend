const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const validateWorkspace = workspace => {
   const schema = Joi.object().keys({
      name: Joi.string().required(),
      projectid: Joi.string(),
      teamid: Joi.string()
   })
   return Joi.validate(workspace, schema)
};

const workspaceSchema = new mongoose.Schema({
   name: {type: String, required:true},
   projectid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
   },
   teamid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team"
   }
});

const workspace = mongoose.model("workspace", workspaceSchema);

module.exports = {
   workspace,
   validateWorkspace
};