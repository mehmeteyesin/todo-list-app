import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
    text: string;
    completed: boolean;
}

interface Props {
    todos: Todo[];
    toggleTodo: (index: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, toggleTodo }) => {
    return (
        <ul>
            {todos.map((todo, index) => (
                <TodoItem key={index} todo={todo} index={index} toggleTodo={toggleTodo} />
            ))}
        </ul>
    );
}

export default TodoList;