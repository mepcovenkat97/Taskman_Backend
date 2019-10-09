require("dotenv").config();
const config = require("config")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes")

const PORT = process.env.PORT ||3000;
const MONGO_CONNECTION = config.get("db.connection-string")

const app = express()

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use("/", routes);


const server = async() => {
   try{
      await mongoose.connect(MONGO_CONNECTION,{
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true
      })
      app.listen(PORT, () => {
         console.log("Server started on ",PORT)
      })
   }
   catch(e){
      console.log(e)
   }
};

server();