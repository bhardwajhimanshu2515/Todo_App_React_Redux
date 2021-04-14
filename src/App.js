import logo from './logo.svg';
import './App.css';
import Header from "./shared/header";
import AddTask from "./components/addTask";
import TodoList from "./components/todoList";
function App() {
  return (
    <div className="App">
      <Header />
      <AddTask />
      <TodoList />
    </div>
  );
}

export default App;
