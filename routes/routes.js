const passport = require("passport");
const passportConfig = require("../passport/passportConfig");
const userLoginController = require("../controllers/userLoginController");
const addUserDataController = require("../controllers/addUserDataController");
const updateUserDataController = require("../controllers/updateUserDataController")
const getUserDataController = require("../controllers/getUserDataController");

const express = require("express");
const router = express.Router();
var path = require("path");
var mime = require("mime");
var fs = require("fs");

router
   .route("/login")
   .post(
      passport.authenticate(passportConfig.METHOD_LOCAL, {session:false}),
      userLoginController.userLogin
   )
router
   .route("/register")
   .post(
      addUserDataController.addUser
   );
router
   .route("/user")
   .get(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      getUserDataController.getUser
   )
router
   .route("/user/:id")
   .put(
      updateUserDataController.updateUser
   )
router
   .route("/project")
   .post(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      addUserDataController.addProject
   )
   .get(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      getUserDataController.getProject
   )

router
   .route("/project/:id")
   .put(
      passport.authenticate(passportConfig.STRATEGY_JWT, {session:false}),
      updateUserDataController.updateProjectDetails
   )
   .get(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      getUserDataController.getProjectById
   )

router
   .route("/workspace")
   .post(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      addUserDataController.addWorkspace
   )
   .get(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      getUserDataController.getWorkspace
   )

router
   .route("/workspace/:id")
   .put(
      passport.authenticate(passportConfig.STRATEGY_JWT, {session:false}),
      updateUserDataController.updateWorkspaceDetails
   )
   .get(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      getUserDataController.getWorkspaceById
   )


router
   .route("/task")
   .post(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      addUserDataController.addTask
   )
   .get(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      getUserDataController.getTask
   )

router
   .route("/task/:id")
   .put(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      updateUserDataController.updateTask
   )
   .get(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      getUserDataController.getTaskById
   )

router
   .route("/team")
   .post(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      addUserDataController.addTeam
   )
   .get(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      getUserDataController.getTeam
   )
router
   .route("/team/:id")
   .put(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      updateUserDataController.updateTeam
   )
   .get(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      getUserDataController.getTeamById
   )

router
   .route("/message")
   .post(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      addUserDataController.addMessage
   )
   .get(
      getUserDataController.getMessage
   )
module.exports = router;
