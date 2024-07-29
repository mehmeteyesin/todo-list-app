import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItemCreator from '../TodoItemCreator';

describe('TodoItemCreator', () => {
    const addTodoMock = jest.fn();

    beforeEach(() => {
        addTodoMock.mockClear();
    });

    test('renders input and button', () => {
        render(<TodoItemCreator addTodo={addTodoMock} />);
        const inputElement = screen.getByPlaceholderText(/Enter new to-do/i);
        const buttonElement = screen.getByText(/Add/i);
        expect(inputElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    test('calls addTodo with correct value and clears input on button click', () => {
        render(<TodoItemCreator addTodo={addTodoMock} />);
        const inputElement = screen.getByPlaceholderText(/Enter new to-do/i);
        const buttonElement = screen.getByText(/Add/i);

        fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
        fireEvent.click(buttonElement);

        expect(addTodoMock).toHaveBeenCalledWith('Test Todo');
        expect(inputElement).toHaveValue('');
    });

    test('triggers addTodo on Enter key press', () => {
        render(<TodoItemCreator addTodo={addTodoMock} />);
        const inputElement = screen.getByPlaceholderText(/Enter new to-do/i);

        fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
        fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter' });

        expect(addTodoMock).toHaveBeenCalledWith('Test Todo');
        expect(inputElement).toHaveValue('');
    });

    test('limits the input to 50 characters', () => {
        render(<TodoItemCreator addTodo={addTodoMock} />);
        const inputElement = screen.getByPlaceholderText(/Enter new to-do/i);

        fireEvent.change(inputElement, { target: { value: 'a'.repeat(60) } });
        expect(inputElement).toHaveValue('a'.repeat(50));
    });
});
