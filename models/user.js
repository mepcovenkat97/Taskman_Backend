const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const validateUser = user => {
  console.log(user)
   const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      type:Joi.string().required(),
      // teamid: Joi.string(),
      // taskid: Joi.string(),
      // projectid: Joi.string(),
   });
   return schema.validate(user);
};

const userSchema = new mongoose.Schema({
   name: {type:String},
   email:{type:String},
   type:{ type:String},
   password:{type:String},
   teamid:{type:mongoose.Schema.Types.ObjectId, ref:"team"},
   taskid:[{type:mongoose.Schema.Types.ObjectId, ref:"task"}],
   projectid:{type:mongoose.Schema.Types.ObjectId, ref:"project"}
})

userSchema.pre("save", async function(next) {
   if (this.method !== "local") {
     return next();
   }
   try {
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(this.local.password, salt);
     this.local.password = hashedPassword;
     next();
   } catch (err) {
     next(err);
   }
 });
 
 userSchema.methods.isValidPassword = async function(newPassword) {
   try {
     return await bcrypt.compare(newPassword, this.local.password);
   } catch (err) {
     throw new Error(err);
   }
 };

const User = mongoose.model("user", userSchema);

module.exports = {
   validateUser,
   User
}