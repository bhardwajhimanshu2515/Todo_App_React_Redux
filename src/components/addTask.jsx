import React, { useState } from "react";
import "./addTask.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodoItem } from "../data/reducers/todo.reducer";
function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const addTodo = async (e) => {
    e.preventDefault();
    let payload = {
      title: title,
      description: description,
      subtask: []
    };
    try {
      let response = await dispatch(addTodoItem(payload));
    } catch (err) {
      console.log(err);
    }
    setTitle(" ");
    setDescription(" ");
  };
  return (
    <div id="addTask">
      <h2>Add Task</h2>
      <form>
        <>
          <label for="title">Task Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
        </>
        <>
          <label for="description">Task Description:</label>
          <textarea
            rows="4"
            cols="10"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <br />
        </>
        <button onClick={addTodo}>Save</button>
      </form>
    </div>
  );
}

export default AddTask;
