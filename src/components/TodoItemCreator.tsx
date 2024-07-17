import React, { useState } from 'react';
import './TodoItemCreator.css';

interface Props {
    addTodo: (text: string) => void;
}

const TodoItemCreator: React.FC<Props> = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
        if (inputValue.trim()) {
            addTodo(inputValue);
            setInputValue('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className="todo-item-creator">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                maxLength={50}
                placeholder="Enter new to-do (max 50 characters)"
            />
            <button onClick={handleAdd}>Add</button>
        </div>
    );
};

export default TodoItemCreator;
