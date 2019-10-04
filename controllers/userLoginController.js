const { generateToken } = require("../helpers/jwt");

exports.userLogin = async (req, res) => {
   try{
      const user = req.body;
      console.log(user);
      const token = generateToken(user);
      console.log(token)
      res.status(200).json({
         token,
         user:{
            _id:user._id,
            email:user.email,
            name:user.name,
            teamid:user.teamid,
            projectid:user.projectid,
            type:user.type
         }
      });
   }
   catch(e){
      res.status(500).send({message:"Internal Server Error"});
   }
}