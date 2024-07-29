import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../TodoItem';

describe('TodoItem', () => {
    const mockTodo = {
        text: 'Test Todo',
        status: 'not-started' as 'not-started' | 'in-progress' | 'completed',
        createDate: new Date('2023-01-01T00:00:00'),
    };
    const index = 0;
    const updateTodoStatus = jest.fn();
    const editTodo = jest.fn();
    const deleteTodo = jest.fn();

    beforeEach(() => {
        updateTodoStatus.mockClear();
        editTodo.mockClear();
        deleteTodo.mockClear();
    });

    test('renders the todo item', () => {
        render(
            <TodoItem
                todo={mockTodo}
                index={index}
                updateTodoStatus={updateTodoStatus}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
            />
        );

        // eslint-disable-next-line testing-library/no-debugging-utils
        //screen.debug();

        expect(screen.getByText(mockTodo.text)).toBeInTheDocument();
        expect(screen.getByDisplayValue('Not Started')).toBeInTheDocument();
        expect(screen.getByText(mockTodo.createDate.toLocaleString())).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '✏️' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '🗑️' })).toBeInTheDocument();
    });

    test('calls updateTodoStatus when status is changed', () => {
        render(
            <TodoItem
                todo={mockTodo}
                index={index}
                updateTodoStatus={updateTodoStatus}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
            />
        );

        fireEvent.change(screen.getByDisplayValue(mockTodo.status), { target: { value: 'in-progress' } });
        expect(updateTodoStatus).toHaveBeenCalledWith(index, 'in-progress');
    });

    test('enters edit mode when edit button is clicked', () => {
        render(
            <TodoItem
                todo={mockTodo}
                index={index}
                updateTodoStatus={updateTodoStatus}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: '✏️' }));
        expect(screen.getByDisplayValue(mockTodo.text)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    test('saves the edited todo when save button is clicked', () => {
        render(
            <TodoItem
                todo={mockTodo}
                index={index}
                updateTodoStatus={updateTodoStatus}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: '✏️' }));
        fireEvent.change(screen.getByDisplayValue(mockTodo.text), { target: { value: 'Updated Todo' } });
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));
        expect(editTodo).toHaveBeenCalledWith(index, 'Updated Todo');
    });

    test('deletes the todo when delete button is clicked', () => {
        render(
            <TodoItem
                todo={mockTodo}
                index={index}
                updateTodoStatus={updateTodoStatus}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: '🗑️' }));
        expect(deleteTodo).toHaveBeenCalledWith(index);
    });

    test('limits the input to 50 characters', () => {
        render(
            <TodoItem
                todo={mockTodo}
                index={index}
                updateTodoStatus={updateTodoStatus}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: '✏️' }));
        const inputElement = screen.getByDisplayValue(mockTodo.text) as HTMLInputElement;

        // Add 60 characters to the input field, should be truncated to 50
        fireEvent.change(inputElement, { target: { value: 'a'.repeat(60) } });
        expect(inputElement.value.length).toBe(50);
    });
});
