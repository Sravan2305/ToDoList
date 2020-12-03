const { json } = require("body-parser");
const { query } = require("express");
const Task = require("../Models/task");

const getAllTasks = async(req , res , next) =>{
    try{
        const tasks = await Task.find({});
        return res.json({data:tasks});

    }
    catch(err)
    {
        console.log(err)
        return res.status(400).json({message:"Error getting the tasks"});
    }
}

const addTask = async (req , res , next ) =>{
    try{
        const task = new Task();
        task.name = req.body.name;
        task.deadline = req.body.deadline;
        task.start = new Date();
        task.end=false;
        task.status = 1;
        console.log(task);
        await task.save();
        return res.json({message:"Task added Succesfully"})
    }
    catch(err)
    {
        console.log(err)
        return res.status(400).json({message:"Error adding the task"});
    }
} 

const deleteTask= async (req , res , next ) =>{
    try 
        { 
            const id = req.query._id ;
           await Task.deleteOne( {"_id": id } )
            return res.json({message : "Task deleted Succesfully"});
        }
        catch(err){
            console.log(err);
            return res.status(400).json({message:"Error Deleting the task"});
        }
}

const updateTask = async (req , res , next ) =>{
    try{
            const uid = req.query._id ;
            const name = req.query.name ;
            const deadline = req.query.deadline ;
            const endt = req.query.end 
            if(req.query.name && req.query.deadline)
            await Task.update(
                { _id: uid},
                { $set: { name: name , deadline:deadline} }
                );
            else if(req.query.name)
            await Task.update(
                { _id: uid},
                { $set: { name: name} }
                );
            else if(req.query.deadline)  
            await Task.update(
                { _id: uid},
                { $set: {deadline:deadline} }
                );  

        res.json({message:"Updated Task details Succesfully"});
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:"Error updating the task"});
    }
}

const updateStatus = async (req , res , next ) =>{
    try{
            const uid = req.query._id ;
            const newstatus = req.query.status ;

            await Task.update(
                { _id: uid},
                { $set: { status: newstatus} }
                );
                const d = new Date();
            if(newstatus===3 || newstatus=='3')
            {   
                await Task.update(
                { _id: uid},
                { $set: { endtime: d} }
                );
                await Task.update(
                    { _id: uid},
                    { $set: { end: true} }
                    );
            }
          else 
          await Task.update(
            { _id: uid},
            { $set:  {end:false} }
            );
        res.json({message:"Updated Task status details Succesfully"});
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:"Error updating the status of the task"});
    }
}


module.exports = {
getAllTasks , 
addTask,
deleteTask,
updateTask,
updateStatus,
}