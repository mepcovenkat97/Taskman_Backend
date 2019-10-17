const { Project } = require("../models/projects")
const { Workspace } = require("../models/workspaces")
const { Task } = require("../models/tasks")
const { Team } = require("../models/teams")
const { User } = require("../models/user")
const { Message } = require("../models/messages");

exports.getUser = async (req,res) => {
   try{
      const user = await User.find()
         .populate(["projectid","teamid"])
      if(!user){
         return res.status(404).send({ message: "User not found" });
      }
      //console.log(user)
      res.send(user)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getUserById = async (req,res) => {
   try{
      const user = await User.findById(req.params.id);
      res.send(user);
   }
   catch(e)
   {
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getProjectById = async (req,res) => {
   try{
      const project = await Project.findById(req.params.id)
      if(!project)
      {
         return res.status(404).send({ message: "Project not found" });
      }
      res.send(project)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getProject = async (req,res) => {
   try{
      const project = await Project.find({})
      if(!project)
      {
         return res.status(404).send({ message: "Project not found" });
      }
      project.map(async (data,index)=>{
         if(new Date(data.startdate) <= new Date(Date.now()) && new Date(data.enddate) > new Date(Date.now()))
         {
            const res = await Project.findByIdAndUpdate(data._id,{"status":"on Going"});
         }
         else if(new Date(data.enddate) < new Date(Date.now()) && new Date(data.startdate) < new Date(Date.now()))
         {
            const res = await Project.findByIdAndUpdate(data._id,{"status":"incomplete"});
         }
         else if( new Date(data.startdate) > new Date(Date.now()) && new Date(data.enddate) > new Date(Date.now()))
         {
            const res = await Project.findByIdAndUpdate(data._id,{"status":"not Started"});
         }
      })
      const project2 = await Project.find({})
         .populate(["taskid", "workspaceid", "teamid","userid"]);
      res.status(200).send(project2);
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getWorkspaceById = async (req,res) => {
   try{
      const workspace = await Workspace.findById(req.params.id)
      if(!workspace)
      {
         return res.status(404).send({ message: "Workspace not found" });
      }
      res.send(workspace)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getWorkspace = async (req, res) => {
   try{
      const workspace = await Workspace.find({})
         .populate('projectid')
      if(!workspace)
      {
         return res.status(404).send({ message: "Workspace not found" });
      }
      res.send(workspace)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getTaskById = async (req,res) => {
   try{
      const task = await Task.findById(req.params.id)
      if(!task)
      {
         return res.status(404).send({ message: "Task not found" });
      }
      res.send(task)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getTask = async (req,res) => {
   try{
      const task = await Task.find({})
        // .populate(["projectid","userid","messageid"])
      if(!task)
      {
         return res.status(404).send({ message: "Task not found" });
      }
      task.map(async (data,index)=>{
         if(task.status != completed)
         {
         if(new Date(data.startdate) <= new Date(Date.now()) && new Date(data.enddate) > new Date(Date.now()))
         {
            const res = await Task.findByIdAndUpdate(data._id,{"status":"on going"});
         }
         else if(new Date(data.enddate) < new Date(Date.now()) && new Date(data.startdate) < new Date(Date.now()))
         {
            const res = await Task.findByIdAndUpdate(data._id,{"status":"incomplete"});
         }
         else if( new Date(data.startdate) > new Date(Date.now()) && new Date(data.enddate) > new Date(Date.now()))
         {
            const res = await Task.findByIdAndUpdate(data._id,{"status":"not started"});
         }
      }
      })
      const task2 = await Task.find()
         .populate(["projectid","userid","messageid"])
      res.send(task2)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getTeamById = async (req, res) => {
   try{
      const team = await Team.findById(req.params.id);
      if(!team)
      {
         return res.status(404).send({ message: "Team not found" });
      }
      res.send(team)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getTeam = async (req,res) => {
   try{
      const team = await Team.find()
         .populate(["projectid","userid"]);
      if(!team){
         return res.status(404).send({ message: "Team not found" });
      }
      res.send(team)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getMessage = async(req,res) => {
   try{
      const message = await Message.find();
      if(!message)
      {
         return res.status(404).send({ message: "Message Not Found"})
      }
      res.send(message)
   }
   catch(e){
      console.log(e)
      res.status(500).send("Internal Server Error");
   }
}

exports.getMessageById = async(req,res) => {
   try{
      const message = await Message.findById(req.params.id)
            .populate("userid");
      if(!message)
      {
         return res.status(404).send({ message: "Message Not Found"})
      }
      res.send(message)
   }
   catch(e){
      console.log(e)
      res.status(500).send("Internal Server Error");
   }
}