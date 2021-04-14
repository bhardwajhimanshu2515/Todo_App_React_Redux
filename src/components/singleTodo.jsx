import React,{useState} from "react";
import "./singleTodo.css";
import {deleteTodoItem,addSubTaskItem,compleSubTaskItem} from "../data/reducers/todo.reducer"
import { useDispatch } from "react-redux";
function SingleTodo(props) {
  const [addSubtaskForm,setAddSubtaskForm]=useState(false);
  const [whichTask,setWhichTask]=useState("");
  const [subTaskTitle,setSubTaskTitle]=useState("");
    const dispatch=useDispatch();

    //function to delete a todo
    const deleteTodo=async (e,id)=>{
        e.preventDefault();
        console.log("id=",id);
        try{
            let response=await dispatch(deleteTodoItem(id));
        }
        catch(err){
            console.log(err);
        }
    }

    //function to add a subtask
    const addSubTask=async(e)=>{
      e.preventDefault();
      setAddSubtaskForm(false);
      let payload={
        index:whichTask,
        data:{
          subtaskTitle:subTaskTitle,
          done:false
        }
      }
      try{
        let response=await dispatch(addSubTaskItem(payload))
      }
      catch(err){
        console.log(err);
      }
      setSubTaskTitle("");
      setWhichTask("");
    }

    //function for done sub task
    const doneTask=async(e,p,i)=>{
      console.log("prev=",props.subtask[i].done);
      let checkState=!props.subtask[i].done;
      let payload={
        parentIndex:p,
        index:i,
        done:checkState
      }
      try{
        let response=await dispatch(compleSubTaskItem(payload))
      }
      catch(err){
        console.log(err);
      }
    }
    console.log("sub=",props.subtask);
    let resultDoneTask=props.subtask.filter(item=>{
      return item.done===true;
    })
    console.log(props.subtask.length,resultDoneTask.length);
  return (
    <>
    {addSubtaskForm===true?(<form style={{width:"30%"}}><input type="text" placeholder="add sub task" name="subTaskTitle" onChange={e=>{setSubTaskTitle(e.target.value)}}/><button onClick={addSubTask}>Add Sub Task</button></form>):("")}
    {props.subtask.length===resultDoneTask.length && props.subtask.length>0?(
      <div className="singleTodo" style={{backgroundColor:"red"}}>
      <div className="info">
        <div className="todoInfo">
          <div className="title">{props.title}</div>
          <div className="description">{props.description}</div>
        </div>
        <div className="othersFunc">
            <button onClick={e=>{
              setAddSubtaskForm(true)
              setWhichTask(props.id)
              }}>+</button>
            <button onClick={e=>{deleteTodo(e,props.id)}}>x</button>
        </div>
      </div>
      <div id="subtask">
        {props.subtask.length>0?(
          props.subtask.map((item,index)=>(
            <div className="subTaskTitle">
              <input type="checkbox" onChange={e=>{doneTask(e,props.id,index)}}></input>
              {item.subtaskTitle}
            </div>
        ))
        ):(<></>)}
      </div>
    </div>
    ):(
      <div className="singleTodo">
      <div className="info">
        <div className="todoInfo">
          <div className="title">{props.title}</div>
          <div className="description">{props.description}</div>
        </div>
        <div className="othersFunc">
            <button onClick={e=>{
              setAddSubtaskForm(true)
              setWhichTask(props.id)
              }}>+</button>
            <button onClick={e=>{deleteTodo(e,props.id)}}>x</button>
        </div>
      </div>
      <div id="subtask">
        {props.subtask.length>0?(
          props.subtask.map((item,index)=>(
            <div className="subTaskTitle">
              <input type="checkbox" onChange={e=>{doneTask(e,props.id,index)}}></input>
              {item.subtaskTitle}
            </div>
        ))
        ):(<></>)}
      </div>
    </div>
    )}
    </>
  );
}

export default SingleTodo;
