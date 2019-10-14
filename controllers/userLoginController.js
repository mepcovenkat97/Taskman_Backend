const { generateToken } = require("../helpers/jwt");
const {Task} = require("../models/tasks");

exports.userLogin = async (req, res) => {
   try{
      const user = req.user;
      console.log(user);
      const token = generateToken(user);
      console.log(token)
     // const taskdetails = await Task.findById(user.taskid);

      res.status(200).json({
         token,
         user:{
            _id:user._id,
            email:user.email,
            name:user.name,
            teamid:user.teamid,
            projectid:user.projectid,
            taskid:user.taskid,
            type:user.type
         }
      });
   }
   catch(e){
      res.status(500).send({message:e.message});
   }
}