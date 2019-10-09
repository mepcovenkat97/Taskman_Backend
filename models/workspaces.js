const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const validateWorkspace = workspace => {
   const schema = Joi.object().keys({
      name: Joi.string().required(),
      projectid: Joi.string(),
      // teamid: Joi.string()
   })
   return schema.validate(workspace)
};

const workspaceSchema = new mongoose.Schema({
   name: {type: String, required:true},
   projectid: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: "project",
      }],
   // teamid: {
   //    type: mongoose.Schema.Types.ObjectId,
   //    ref: "team"
   // }
});

const Workspace = mongoose.model("workspace", workspaceSchema);

module.exports = {
   Workspace,
   validateWorkspace
};