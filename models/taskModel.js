const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task:String,
    msg:String,
    user:{
       type:mongoose.SchemaTypes.ObjectId,
       ref:"user",
       required:true
    }
  },
  { timestamps: true}
);

module.exports = mongoose.model("tasks",taskSchema);