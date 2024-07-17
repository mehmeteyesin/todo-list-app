import React, { useState } from 'react';
import TodoList from './components/TodoList';
import './App.css';

interface Todo {
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodos = [...todos, { text, completed: false }];
    setTodos(newTodos);
  };

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
      <div className="app">
        <h1>To-Do List</h1>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <button onClick={() => addTodo(prompt('Enter new to-do:') || '')}>Add To-Do</button>
      </div>
  );
}

export default App;
