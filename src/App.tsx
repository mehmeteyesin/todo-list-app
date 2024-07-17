import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoItemCreator from './components/TodoItemCreator';
import './App.css';

interface Todo {
    text: string;
    status: 'not-started' | 'in-progress' | 'completed';
    createDate: Date;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState<string | null>(null);

    const addTodo = (text: string) => {
        if (todos.length >= 10) {
            setError('You can only have a maximum of 10 items in the to-do list.');
            return;
        }
        setError(null);
        const newTodo: Todo = { text, status: 'not-started', createDate: new Date() };
        setTodos([...todos, newTodo]);
    };

    const updateTodoStatus = (index: number, status: 'not-started' | 'in-progress' | 'completed') => {
        const newTodos = [...todos];
        newTodos[index].status = status;
        setTodos(newTodos);
    };

    const editTodo = (index: number, newText: string) => {
        const newTodos = [...todos];
        newTodos[index].text = newText;
        setTodos(newTodos);
    };

    const deleteTodo = (index: number) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
        setError(null);
    };

    return (
        <div className="app">
            <h1>To-Do List</h1>
            <TodoItemCreator addTodo={addTodo} />
            {error && <p className="error">{error}</p>}
            <TodoList todos={todos} updateTodoStatus={updateTodoStatus} editTodo={editTodo} deleteTodo={deleteTodo} />
        </div>
    );
};

export default App;
