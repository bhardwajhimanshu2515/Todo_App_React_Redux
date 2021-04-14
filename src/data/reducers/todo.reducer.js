import { createSlice} from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: []
  },
  reducers: {
      addTodoItem:(state,action)=>{
        state.todoList=[...state.todoList,action.payload];
        console.log("state=", state.todoList);
      },
      deleteTodoItem:(state,action)=>{
        console.log("action payload=",action.payload);
        let newArray=state.todoList;
        let res=newArray.filter((item,i)=>{
          return i!==action.payload
        })
        state.todoList=res;
      },
      addSubTaskItem:(state,action)=>{
        console.log(action.payload);
        let newArray=state.todoList;
        for(let i=0;i<newArray.length;i++){
          if(i===action.payload.index){
            newArray[i].subtask.push(action.payload.data);
          }
        }
        state.todoList=[...newArray]
        console.log("state=",state.todoList);
      },
      compleSubTaskItem:(state,action)=>{
        console.log(action.payload);
        let newArray=state.todoList;
        newArray[action.payload.parentIndex].subtask[action.payload.index]={subtaskTitle:newArray[action.payload.parentIndex].subtask[action.payload.index].subtaskTitle,done:action.payload.done};
        state.todoList=[...newArray];
      }
  },
});

export const {addTodoItem,deleteTodoItem,addSubTaskItem,compleSubTaskItem}=todoSlice.actions;
export default todoSlice.reducer;
