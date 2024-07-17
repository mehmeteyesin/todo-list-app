import React, { useState } from 'react';

interface Todo {
    text: string;
    status: 'not-started' | 'in-progress' | 'completed';
    createDate: Date;
}

interface Props {
    todo: Todo;
    index: number;
    updateTodoStatus: (index: number, status: 'not-started' | 'in-progress' | 'completed') => void;
    editTodo: (index: number, newText: string) => void;
    deleteTodo: (index: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, index, updateTodoStatus, editTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateTodoStatus(index, event.target.value as 'not-started' | 'in-progress' | 'completed');
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        editTodo(index, newText);
        setIsEditing(false);
    };

    const handleDelete = () => {
        deleteTodo(index);
    };

    return (
        <tr className={todo.status}>
            <td className="description">
                {isEditing ? (
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        maxLength={50}
                    />
                ) : (
                    todo.text
                )}
            </td>
            <td className="status">
                <select value={todo.status} onChange={handleStatusChange}>
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </td>
            <td className="date">{todo.createDate.toLocaleString()}</td>
            <td className="actions">
                {isEditing ? (
                    <button onClick={handleSave}>Save</button>
                ) : (
                    <button onClick={handleEdit}>✏️</button>
                )}
                <button onClick={handleDelete} style={{ color: 'red' }}>🗑️</button>
            </td>
        </tr>
    );
};

export default TodoItem;
