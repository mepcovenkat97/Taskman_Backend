const { Workspace } = require("../models/workspaces");

exports.deleteWorkspaceById = async (req,res) =>{
	try{
		const workspace = await Workspace.findByIdAndDelete(req.body._id);
		if(!workspace)
		{
			res.status(404).send({message:"Workspace Not Found"});
		}
		res.send(workspace);
	}
	catch(e){
		console.log(e);
      res.status(500).send("Internal Server Error");
	}
}