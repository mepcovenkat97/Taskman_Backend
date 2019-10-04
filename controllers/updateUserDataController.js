const { Project } = require("../models/projects")
const { Workspace } = require("../models/workspaces")
const { Task } = require("../models/tasks")
exports.updateProjectDetails = async (req, res) => {
   const id = req.params.id;
   try{
      if(req.body.taskid)
      {
         const newid = req.body.taskid;
         const project = await Project.findByIdAndUpdate(id,{
            $push: {
               taskid:newid
            }
         })
         res.send(project);
      }
      else
      {
         const project = await Project.findByIdAndUpdate(id, req.body)
         res.send(project);
      }
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.updateWorkspaceDetails = async(req, res) => {
   const id = req.params.id;
   try{
      console.log(res.body)
      const workspace = await Workspace.findByIdAndUpdate(id, req.body, {new:true})
      res.send(workspace)
   }
   catch(e){
      console.log(e);
      res.status(500).send("Internal Server Error");
   }
}

exports.updateTask = async(req,res) => {
   const id = req.params.id;
   try{
      if(req.body.messageid){
         const task = await Task.findByIdAndUpdate(id,{
            $push:{
               messageid:req.body.messageid
            }
         })
         res.send(task);
      }
      else{
         const task = await Task.findByIdAndUpdate(id, req.body)
         res.send(task)
      }
      
   }
   catch(e){
      console.log(e);
      res.status(500).semessageidnd("Internal Server Error");
   }
}

exports.updateTeam = async (req,res) => {}