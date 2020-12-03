import React from 'react';
import './addTask.scss';
import SubmitButton from '../Button/Button';
const axios = require('axios');

const AddTask = () => {

  // const [state, setState] = React.useState({
  //   taskName: "",
  //   deadline: ""
  // })
  // const changeHandler = (event) => {
  //   let nam = event.target.name;
  //   let val = event.target.value;
  //   this.setState({[nam]: val});
  // }
  // // let taskname="";
  // // let deadline="";
  let [taskName, setTaskName] = React.useState('');
  let [deadline, setDeadline] = React.useState('');

  const clickHandler = () => {
    if( !deadline || isNaN(deadline)) deadline = 8;
    console.log("hello")
    axios
    .post('http://localhost:9000/addTask', {
      "name": taskName,
      "deadline": deadline
    })
    .then((res)=>
      {
        console.log(res)
        taskName=''
        deadline=''
        window.open('http://localhost:3000/add','_self')
      }

    )
    .catch((err)=>console.log(err))
  }
  // // const inputHandler = (event) => {
  // //   taskname = event.target.value;
  // // }
  


    return(
        <div className="main">
          <h1>Enter the Details</h1>
            <table className="table">
              <tr>
                <td>
                  Enter the Task Name<sup>*</sup>
                </td>
                <td><input value={taskName} type="text" name="taskName" onChange={event => setTaskName(event.target.value)} /> </td>
                </tr>
                <tr>
                <td>
                  Enter the deadline
                </td>
                <td><input value={deadline} type="text" name="deadline" onChange={event => setDeadline(event.target.value)}/></td>
                </tr>
                <span  className="invalid"><sup>*</sup>Task name cannot be empty</span>
            </table>

            <SubmitButton className="submit" clicked= { (event)=> clickHandler(event)}>Add Task</SubmitButton>

        </div>
      );
}

export default AddTask ; 

