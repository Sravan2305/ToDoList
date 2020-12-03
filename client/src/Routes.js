import  { Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import addTask from './Components/Add Task/addTask';
import allTasks from './Components/All/all';
import priorityTasks from './Components/Priority/priority'
import completedTasks from './Components/Completed/completed';

function GiveRoutes(){
  return(
    <div>
    <Route exact path="/" component={Home}></Route>
    <Route  path="/add" component={addTask}></Route>
    <Route  path="/all" component={allTasks}></Route>
    <Route  path="/priority" component={priorityTasks}></Route>
    <Route  path="/completed" component={completedTasks}></Route>
    </div>
  );
}
export default GiveRoutes ;

    //add all priority completed
