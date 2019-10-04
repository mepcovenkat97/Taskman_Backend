const passport = require("passport");
const passportConfig = require("../passport/passportConfig");
const userLoginController = require("../controllers/userLoginController");
const addUserDataController = require("../controllers/addUserDataController");
const updateUserDataController = require("../controllers/updateUserDataController")
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

router
   .route("/project/:id")
   .put(
      passport.authenticate(passportConfig.STRATEGY_JWT, {session:false}),
      updateUserDataController.updateProjectDetails
   )


router
   .route("/workspace/:id")
   .put(
      passport.authenticate(passportConfig.STRATEGY_JWT, {session:false}),
      updateUserDataController.updateWorkspaceDetails
   )
router
   .route("/workspace")
   .post(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      addUserDataController.addWorkspace
   )


router
   .route("/task")
   .post(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      addUserDataController.addTask
   )

router
   .route("/task/:id")
   .put(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      updateUserDataController.updateTask
   )

router
   .route("/team")
   .post(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      addUserDataController.addTeam
   )
router
   .route("/team/:id")
   .put(
      //passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      updateUserDataController.updateTeam
   )

router
   .route("/message")
   .post(
      passport.authenticate(passportConfig.STRATEGY_JWT,{session:false}),
      addUserDataController.addMessage
   )
module.exports = router;
