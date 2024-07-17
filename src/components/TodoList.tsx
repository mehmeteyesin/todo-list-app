import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
    text: string;
    status: 'not-started' | 'in-progress' | 'completed';
    createDate: Date;
}

interface Props {
    todos: Todo[];
    updateTodoStatus: (index: number, status: 'not-started' | 'in-progress' | 'completed') => void;
    editTodo: (index: number, newText: string) => void;
    deleteTodo: (index: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, updateTodoStatus, editTodo, deleteTodo }) => {
    return (
        <table>
            <thead>
            <tr>
                <th className="description">Description</th>
                <th className="status">Status</th>
                <th className="date">Create Date</th>
                <th className="actions"></th>
            </tr>
            </thead>
            <tbody>
            {todos.map((todo, index) => (
                <TodoItem
                    key={index}
                    todo={todo}
                    index={index}
                    updateTodoStatus={updateTodoStatus}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
            </tbody>
        </table>
    );
};

export default TodoList;
