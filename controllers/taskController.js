const Task = require("../models/taskModel");
const customeError = require("../auth/customeError");

const getAllTask = async (req,res,next)=>{
    try {
        const userTask = req.params.id;

        const tasks = await Task.find({user:userTask});

        if (!tasks) {
           return next(new customeError("there is no tasks!",400)); 
        }

        res.json({
            success: true,
            tasks,
          });

    } catch (error) {
        return next(new customeError(error.message,))
    }
};

const removeATask = async (req,res,next)=>{
    try {
        const id = req.params.id;

       const task =  await Task.findByIdAndDelete(id);
       if (!task) {
     return   res.json({
            success: false,
            message:"task not found!",
          });
       }

        res.json({
            success: true,
            message:"task deleted successfully!",
          });

    } catch (error) {
        return next(new customeError(error.message,));
    }
};

const addNewTask = async (req,res,next)=>{
    try {
       const {task,msg,user} = req.body;

       const newTask = await Task.create({
        task,
        msg,
        user
       });

       res.json({
        task:newTask
       });



    } catch (error) {
        return next(new customeError(error.message,));
    }
}

module.exports = {getAllTask,removeATask,addNewTask};