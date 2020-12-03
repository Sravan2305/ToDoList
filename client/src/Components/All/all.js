import React from 'react';
import Task from '../Task/Task';
import './all.scss';
const axios = require('axios');


class AllTasks extends React.Component{

    constructor (props) {
        super(props)
    
        this.state = {
            showmodel:false,
            alltasks:[],
            show: false,
            editid:null,
            editname:null,
            editstatus:null,
            editdeadline:null,
            editindex:null,
            mininc:0,
            changer:""
        }
      }
      
       showModal = async (x,y,z,w,index) => {
        // console.log("obj is"+this.state.editname);

    await  this.setState({ show: true , editid:x,editname:y , editstatus:z , editdeadline:w ,editindex:index});

          // console.log("obj is"+this.state.editname);
         // console.log(this.state.presentEdit)
        };
      
        hideModal = async() => {
          this.setState({ show: false });
          console.log("HIDING MODAL")

        };

    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        60*1000
      );

      axios
      .get('http://localhost:9000/getAllTasks')
        .then((res)=>{
            this.setState({alltasks:res.data.data})
   
        })
  
    }

    componentWillUnmount() {
 
      clearInterval(this.timerID);
    }
    tick() {
      this.setState({
        mininc: (this.state.mininc)+1
      });
    }
  
    // delhandler = (x) =>{
    //     console.log("hi")
    // console.log(x);
    //     }
    // let taskList = [...this.state.alltasks]
    // taskList.splice(index, 1);
    // this.setState({alltasks: taskList})
  triggerDelete = (x,index)=>{
       let taskList = [...this.state.alltasks]
        taskList.splice(index, 1);
        this.setState({alltasks: taskList})
        axios
        .get('http://localhost:9000/deleteTask?_id='+x)
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
     }

     changeHandler =async (event)=>{
       if(event.target.name=="editname")
      await this.setState({editname:event.target.value})
       else if(event.target.name=="editstatus")
      await this.setState({editstatus:event.target.value})
       else if(event.target.name=="editdeadline")
      await this.setState({editdeadline:event.target.value})
     }

     edit = async (e)=>{
      //  console.log(this.state.editname);
      //  console.log("status"+this.state.editstatus);
      //  console.log("deadline"+this.state.editdeadline);

       if(isNaN(this.state.editdeadline)||isNaN(this.state.editstatus)) 
        {
          console.log("Incorrect values")
          return;
        }
        let id = this.state.editid;
        let na = this.state.editname;
        let dl = this.state.editdeadline;
        let st = this.state.editstatus ;
        axios
        .get("http://localhost:9000/updateTask?_id="+id+"&deadline="+dl+"&name="+na+"&status="+st)
        .then((res)=>{
          let app = "";
          if(st==3){
            let d= new Date()
            app="&end="+d
          }
         // console.log("http://localhost:9000/updateStatus?_id="+id+"&status="+st+app)
          if(st<=3 && st>=1)
          axios
          .get("http://localhost:9000/updateStatus?_id="+id+"&status="+st+app)
          .then(console.log("Status changed"))
          })
        .catch((err)=>console.log("Error Updating"))
        this.hideModal();
        /////////////////////////////////////////////
                      const items = this.state.alltasks

                      const insert = (arr, index, newItem) => [
                        ...arr.slice(0, index),
                        newItem,
                        ...arr.slice(index)
                      ]
                      var ind = this.state.editindex;
                    items[ind]["name"]=na;
                    items[ind]["status"]=st;
                    items[ind]["deadline"]=dl;
                    await this.setState({alltasks: items})
       //////////////////////////////////////////              
  // window.open("http://localhost:3000/all","_self")
  // e.preventDefault()
      }
      tohm = (dif)=>{
                      
        var m = dif % 60;
        var h = (dif-m)/60;
        m=Math.ceil(m);
        return h.toString() + " hr " + (m<10?"0":"") + m.toString()+" mins";
      }
    render(){
        //console.log(this.state.alltasks)

          const tasks = this.state.alltasks.map((task,index) => {
              //  let x = task._id;       onClick={this.delhandler(x)}
              let x = task._id;
              let y = task.name;
              let z = task.status;
              let w = task.deadline;

              var start = new Date(task.start)
              var now  = new Date()
              var dif = (now - start)/1000/60 + this.state.mininc;
              
              var prior=""

                var currentStatusString=""
                var actual= "Deadline : "+task.deadline+" hrs";

                if(task.status===1 || task.status===2){
                  if(dif > task.deadline*60)
                  {
              
                   currentStatusString="Time Limit already Exceeded"
                   prior="IMP"
                  }
                  else{
                 
                      currentStatusString="Time Left : "+ this.tohm(task.deadline*60-dif)
                  }
                  if(dif>=task.deadline*30) prior="IMP"
                }
                if( task.status===3){
                  var start = new Date(task.start)
                  var now  = new Date(task.endtime)
                  var dif = (now - start)/1000/60
                  console.log("gjh "+ dif) 
                  if(dif > task.deadline*60)
                  currentStatusString="Extra time Taken : "+this.tohm(dif-task.deadline*60+this.state.mininc)
                  else 
                  currentStatusString = "On Time"+this.state.changer
                }
                console.log(task.end)
              if(task.status==1 )
                return <Task key={task.id} customclass={"incomplete"} taskName={task.name} status={task.status}  currentStatus={currentStatusString} priority={prior} remark={"Not Started"} edit={(e)=>this.showModal(x,y,z,w,index)} delete={(e)=>{
                    this.triggerDelete(x,index);
                 }} />
                if(task.status==2)
                return <Task key={task.id} customclass={"progress"} taskName={task.name} status={task.status} currentStatus={currentStatusString}  priority={prior}  remark={"In Progress"} edit={(e)=>this.showModal(x,y,z,w,index)} delete={(e)=>{
                    this.triggerDelete(x,index);
                 }} />
                if(task.status==3 )
                return <Task key={task.id} customclass={"complete"} taskName={task.name} status={task.status} currentStatus={currentStatusString} remark={"Completed"}  edit={(e)=>this.showModal(x,y,z,w,index)} delete={(e)=>{
                    this.triggerDelete(x,index);
                 }} />
            })
           
        return(
            <div className="all">
          <Modal  show={this.state.show} handleClose={this.hideModal} editdata={this.state.editData} currid={this.state.presentEdit} >
           <h1>Update the details</h1>
           <table className="mytable">
             <tr>
                <td>Name</td>
                <td><input type="text"  name="editname"  placeholder={this.state.editname} onChange={(event)=>this.changeHandler(event)}/><br/></td>
             </tr>
             <tr>
                <td>deadline</td>
                <td><input type="text"  name="editdeadline" placeholder={this.state.editdeadline} onChange={(event)=>this.changeHandler(event)}/><br/></td>
             </tr>
             <tr>
                <td>status</td>
                
                {/* <td><input type="text"  name="editstatus" placeholder={this.state.editstatus} onChange={(event)=>this.changeHandler(event)}/><br/> */}
                <td>
                <select name="editstatus" onChange={(event)=>this.changeHandler(event)} >
                  <option value="1">Not Started</option>
                  <option value="2">In Progress</option>
                  <option value="3">Completed</option>
                </select>
                </td>
             </tr>
           </table>
           <button className="mybutton" onClick={this.edit} >Submit</button>
            </Modal>
                {tasks}
            </div>
        )
    }

}
export default AllTasks;


const Modal = ({ handleClose, show, editdata, currid,children}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  console.log("In modal" +editdata)
    return (
      <div className={showHideClassName}>

        <section className="modal-main">
        <button className="close" onClick={handleClose}>X</button>
          {children}
        </section>
      </div>
    );
  };