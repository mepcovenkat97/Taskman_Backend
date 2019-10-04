const { Project } = require("../models/projects")
const { Workspace } = require("../models/workspaces")
const { Task } = require("../models/tasks")
const { Team } = require("../models/teams")
const { User } = require("../models/user")

exports.getProjectById = async (req,res) => {
   try{
      const user = await Project.findById(req.params.id)
      res.send(user)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getProject = async (req,res) => {
   try{
      const user = await Project.find({});
      res.send(user);
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getWorkspaceById = async (req,res) => {
   try{
      const workspace = await Workspace.findById(req.params.id)
      res.send(workspace)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getWorkspace = async (req, res) => {
   try{
      const workspace = await Workspace.find()
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
      res.send(task)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getTask = async (req,res) => {
   try{
      const task = await Task.find()
      res.send(task)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getTeamById = async (req, res) => {
   try{
      const team = await Team.findById(req.params.id);
      res.send(team)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.getTeam = async (req,res) => {
   try{
      const team = await Team.find();
      res.send(team)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

