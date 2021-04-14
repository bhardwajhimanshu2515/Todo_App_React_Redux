import React,{lazy} from "react";
import "./todoList.css";
import {useDispatch,useSelector} from "react-redux";
import SingleTodo from "./singleTodo";
function TodoList(){
    const todoList=useSelector(state=>state.todoReducer).todoList;
    const resultJSX=todoList.map((item,i)=><SingleTodo title={item.title} description={item.description} key={i} id={i} subtask={item.subtask}/>)
    return(
        <>
        {todoList.length>0?(<h2 style={{color:"#58d68d"}}>Task List</h2>):("")}
        <div id="todoLists">
            {resultJSX}
        </div>
        </>
    )
}

export default TodoList;