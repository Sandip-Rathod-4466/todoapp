const express = require("express");
const dotenv = require("dotenv");
dotenv.config({path:"./database/config.env"});
require("./database/db.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const handleError = require("./auth/errorHandling.js");
const userRoutes = require("./routes/userRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");
const app = express();

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.use(cookieParser());
app.use(cors({
  credentials:true
}));
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/task",taskRoutes);




app.get("/", (req, res) => {
  
  res.send("Home page working");
});

app.use(handleError);



module.exports = app;