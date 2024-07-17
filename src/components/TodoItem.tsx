import React from 'react';

interface Todo {
    text: string;
    completed: boolean;
}

interface Props {
    todo: Todo;
    index: number;
    toggleTodo: (index: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, index, toggleTodo }) => {
    return (
        <li
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => toggleTodo(index)}
        >
            {todo.text}
        </li>
    );
}

export default TodoItem;