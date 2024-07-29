import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';
import TodoItem from '../TodoItem';

jest.mock('../TodoItem', () => {
    return jest.fn(({ todo, index, updateTodoStatus, editTodo, deleteTodo }) => (
        <tr data-testid="todo-item">
            <td>{todo.text}</td>
        </tr>
    ));
});

describe('TodoList', () => {
    const todos = [
        {
            text: 'Test Todo 1',
            status: 'not-started' as 'not-started' | 'in-progress' | 'completed',
            createDate: new Date('2023-01-01T00:00:00'),
        },
        {
            text: 'Test Todo 2',
            status: 'in-progress' as 'not-started' | 'in-progress' | 'completed',
            createDate: new Date('2023-01-02T00:00:00'),
        },
    ];
    const updateTodoStatus = jest.fn();
    const editTodo = jest.fn();
    const deleteTodo = jest.fn();

    beforeEach(() => {
        (TodoItem as jest.Mock).mockClear();
    });

    test('renders the table headers correctly', () => {
        render(
            <TodoList
                todos={[]}
                updateTodoStatus={updateTodoStatus}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
            />
        );

        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText('Create Date')).toBeInTheDocument();
    });

    test('renders the correct number of TodoItem components', () => {
        render(
            <TodoList
                todos={todos}
                updateTodoStatus={updateTodoStatus}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
            />
        );

        expect(screen.getAllByTestId('todo-item').length).toBe(todos.length);
    });

    test('passes correct props to TodoItem components', () => {
        render(
            <TodoList
                todos={todos}
                updateTodoStatus={updateTodoStatus}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
            />
        );

        todos.forEach((todo, index) => {
            expect(TodoItem).toHaveBeenNthCalledWith(
                index + 1,
                {
                    todo,
                    index,
                    updateTodoStatus,
                    editTodo,
                    deleteTodo,
                },
                {}
            );
        });
    });
});
