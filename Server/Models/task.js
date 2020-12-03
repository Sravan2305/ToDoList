const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {type: String , required:true},
    start: {type: Date  , required:true},
    deadline: {type: Number , required:true},
    end : {type: Boolean , required:true },
    endtime:{type: Date  },
    status : {type : Number , required: true},       /// 1.) Not Started 2.) In Progress 3.) Completed
});

const Task = mongoose.model("Task" , TaskSchema);

module.exports = Task ; 