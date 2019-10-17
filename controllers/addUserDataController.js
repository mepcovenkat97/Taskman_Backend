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

    const isAvail = await User.findOne({email:req.body.email})
      console.log(isAvail)
      if(isAvail)
        {
        return res.status(409).json({message:"Conflict"})
      }
      else{

    const {
      email,
      password,
      name,
      type,
      teamid
    } = req.body;

    // create user with role
    const newUser = new User({
       method: passportConfig.METHOD_LOCAL,
       email, 
       password ,
      name,
      teamid,
      type
    });
    await newUser.save();
    const team = await Team.findByIdAndUpdate(req.body.teamid,{
      $push:{
        userid:newUser._id
      }
    })
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
  }
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
         userid,
      } = req.body;
      let status;
      if(req.body.startdate == new Date())
      {
        status = "ongoing";
      }
      else if(req.body.startdate < new Date())
      {
        status = "not Started";
      }
      else if(req.body.enddate < new Date())
      {
        status = "incomplete"
      }
      const newProject = new Project({
         title,
         workspaceid,
         startdate,
         enddate,
         teamid,
         taskid,
         userid,
         status
      });
      const ans = await newProject.save();
      console.log(ans);
      const reans = await Workspace.findByIdAndUpdate(ans.workspaceid,{
        $push:{
          "projectid":ans._id
        }
      })
      if(ans.teamid)
      {
        const reeans = await Team.findByIdAndUpdate(ans.teamid,{
          $push:{
            "projectid":ans._id
          }
        })
      }
      else if(ans.userid)
      {
        const reeans = await Team.findByIdAndUpdate(ans.userid,{"projectid":ans._id})
      }
      res.status(201).json({
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

      const isAvail = await Task.findOne({name:req.body.title})
      console.log(isAvail)
      if(isAvail)
        {
        return res.status(409).json({message:"Conflict"})
      }

      const {
         userid,
         projectid,
         name,
         priority,
         messageid,
         startdate,
         enddate,
      } = req.body;
      const startDate = new Date(req.body.startdate);
      const endDate = new Date(req.body.enddate);
      const currDate = new Date(Date.now());
      let status = "";
      if(startDate <= currDate && endDate > currDate)
      {
        status = "ongoing";
      }
      else if(endDate < currDate && startDate < currDate)
      {
        status  = "incomplete";
      }
      else if(startDate > currDate && endDate > currDate)
      {
        status = "not started";
      }

      const newTask = new Task({
         userid,
         projectid,
         name,
         priority,
         messageid,
         startdate,
         enddate,
         status
      })
      const task = await newTask.save();
      const proj = await Project.findByIdAndUpdate(task.projectid,{
        $push:{
          "taskid":task._id
        }
      })
      const user = await User.findByIdAndUpdate(task.userid,{
        $push:{
          "taskid":task._id
        }
      })
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

      const isAvail = await Team.findOne({name:req.body.title})
      console.log(isAvail)
      if(isAvail)
        {
        return res.status(409).json({message:"Conflict"})
      }
      const { name, projectid } = req.body;
      const userid = req.body.userid.split(',');
      const newTeam = new Team({
         name,
         userid,
         projectid
      })
      const result = await newTeam.save();
      console.log(result);
      result.userid.map(async (user,index)=>{
        const updateuser = await User.findByIdAndUpdate(user,{"teamid":result._id});
        console.log(updateuser);
      });
      //
      const project = await Project.findByIdAndUpdate(result.projectid, {"teamid":result._id});
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
      const { content, userid, taskid } = req.body
      const newMessage = new Message({
         content,
         userid,
         taskid,
      })
      const msg = await newMessage.save();
      const task = await Task.findByIdAndUpdate(msg.taskid,{
        $push:{
          "messageid":msg._id
        }
      })
      res.status(200).json({newMessage});
   }catch(e){
      res.status(500).json({ message: "Server error." });
    console.log("ERROR:", e);
   }
}