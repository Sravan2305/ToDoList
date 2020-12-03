import React from 'react';
import './Task.scss'
class Task extends React.Component{


    render(){
        let myclass="";
        if(this.props.customclass === "incomplete")
        myclass=this.props.customclass
        else if(this.props.customclass === "progress")
        myclass=this.props.customclass
        else
        myclass=this.props.customclass

        return(
            
            <div className={myclass}>
                <div className="priority">
                    {this.props.priority}
                </div>
               <h3>  {this.props.taskName}</h3>
                <p>{this.props.remark}</p>
                <p>{this.props.currentStatus}</p>
               <button onClick={this.props.edit}className="edit">Edit</button>
               <button onClick={this.props.delete} className="delete">Delete</button>
            </div>
        )
    }
}
export default Task;