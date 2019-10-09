const _ = require("lodash");
const { validateUser, User } = require("../models/user");
const { validateProject, Project } = require("../models/projects")
const { validateWorkspace, Workspace } = require("../models/workspaces")
const { validateTask, Task } = require("../models/tasks")
const { validateTeam, Team } = require("../models/teams")
const { validateMessage, Message } = require("../models/messages");

const jwt = require("../helpers/jwt");
const passportConfig = require("../passport/passportConfig");

exports.addUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      email,
      password,
      name,
      type
    } = req.body;

    // create user with role
    const newUser = new User({
       method: passportConfig.METHOD_LOCAL,
       email, 
       password ,
      name,
      type
    });
    await newUser.save();

    // genrate token
    const token = jwt.generateToken(newUser);

    res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        type: newUser.type
      }
    });
  } catch (e) {
    res.status(500).json({ message: "Server error." });
    console.log("ERROR:", e);
  }
};


exports.addProject = async (req,res) => {
   try{
    console.log(req.body)
      const { error } = validateProject(req.body);
      if(error){
         return res.status(400).json({ message: error.details[0].message });
      }

      const isAvail = await Project.findOne({name:req.body.title})
      console.log(isAvail)
      if(isAvail)
        {
        return res.status(409).json({message:"Conflict"})
      }
      else{
      const {
         title,
         workspaceid,
         startdate,
         enddate,
         teamid,
         taskid,
      } = req.body;

      const newProject = new Project({
         title,
         workspaceid,
         startdate,
         enddate,
         teamid,
         taskid
      });
      const ans = await newProject.save();
      console.log(ans._id);
      const reans = await Workspace.findByIdAndUpdate(ans.workspaceid,{
        $push:{
          "projectid":ans._id
        }
      })
      const reeans = await Team.findByIdAndUpdate(ans.teamid,{
        $push:{
          "projectid":ans._id
        }
      })
      res.status(200).json({
         title:newProject.title,
      });
      }
   }catch(e){
      res.status(500).json({ message: "Server error." });
    console.log("ERROR:", e);
   }
}

exports.addWorkspace = async (req, res) => {
   try{
      console.log(req.body)
      const { error } = validateWorkspace(req.body);
      if(error){
        console.log(req.body)
         return res.status(400).json({ message: error.details[0].message });
      }
      console.log("Inside Add Workspace API")
      console.log(req.body)
      const isAvail = await Workspace.findOne({name:req.body.name})
      if(isAvail)
      {
        return res.status(409).json({message:"Conflict"})
      }
      else
      {
      const {
         name,
         projectid,
         //teamid
      }=req.body;

      const newWorkspace = new Workspace({
         name,
         projectid,
         //teamid
      });
      await newWorkspace.save();
      res.status(200).json({
         name:newWorkspace.name
      })
      }
   }catch(e){
      res.status(500).json({ message: "Server error." });
    console.log("ERROR:", e);
   }
}

exports.addTask = async (req, res) => {
   try{
      console.log(req.body)
      const { error } = validateTask(req.body);
      if(error){
         return res.status(400).json({message:error.details[0].message})
      }

      const {
         userid,
         projectid,
         name,
         priority,
         messageid
      } = req.body;
      const newTask = new Task({
         userid,
         projectid,
         name,
         priority,
         messageid
      })
      await newTask.save();
      res.status(200).json({ newTask })
   }catch(e){
      res.status(500).json({ message: "Server error." });
    console.log("ERROR:", e);
   }
}
exports.addTeam = async (req, res)=> {
   try{
      const { error } = validateTeam(req.body)
      if(error){
         return res.status(400).json({message:error.details[0].message})
      }
      const { name, memberslist, projectslist } = req.body;
      const newTeam = new Team({
         name,
         memberslist,
         projectslist
      })
      await newTeam.save();
      res.status(200).json({ newTeam });
   }catch(e){
      res.status(500).json({ message: "Server error." });
    console.log("ERROR:", e);
   }
}

exports.addMessage = async (req, res) => {
   try{

      const { error } = validateMessage(req.body);
      if(error){

         return res.status(400).json({message:error.details[0].message})
      }
      const { content, userid, taskid, projectid } = req.body
      const newMessage = new Message({
         content,
         userid,
         taskid,
         projectid
      })
      await newMessage.save();
      res.status(200).json({newMessage});
   }catch(e){
      res.status(500).json({ message: "Server error." });
    console.log("ERROR:", e);
   }
}