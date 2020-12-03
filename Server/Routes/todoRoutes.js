const express = require('express');
const route = express.Router(); //creatting router object 
const taskController = require('../Controllers/todoController');



//route.get("/getAllBooks" , bookController.getBooks);

route.get("/getAllTasks" , taskController.getAllTasks);

route.post("/addTask", taskController.addTask);

route.get("/deleteTask" , taskController.deleteTask);

route.get("/updateTask" , taskController.updateTask);

route.get("/updateStatus" , taskController.updateStatus);


module.exports = route ;