import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

jest.mock('../components/TodoItemCreator', () => {
  return jest.fn(({ addTodo }) => (
      <div>
        <input
            type="text"
            placeholder="Enter new to-do (max 50 characters)"
            data-testid="input"
        />
        <button onClick={() => addTodo('Test Todo')} data-testid="add-button">Add</button>
      </div>
  ));
});

jest.mock('../components/TodoList', () => {
  return jest.fn(({ todos, updateTodoStatus, editTodo, deleteTodo }) => (
      <table>
        <tbody>
        {todos.map((todo: { text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
            <tr key={index} data-testid="todo-item">
              <td>{todo.text}</td>
              <td>
                <button onClick={() => deleteTodo(index)} data-testid={`delete-button-${index}`}>Delete</button>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
  ));
});

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the initial UI correctly', () => {
    render(<App />);

    expect(screen.getByText('To-Do List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter new to-do')).toBeInTheDocument();
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
  });

  test('adds a new todo item', () => {
    render(<App />);

    fireEvent.click(screen.getByTestId('add-button'));

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('shows error message when adding more than 10 items', () => {
    render(<App />);

    for (let i = 0; i < 10; i++) {
      fireEvent.click(screen.getByTestId('add-button'));
    }

    fireEvent.click(screen.getByTestId('add-button'));

    expect(screen.getByText('You can only have a maximum of 10 items in the to-do list.')).toBeInTheDocument();
  });

  test('deletes a todo item and clears error message', () => {
    render(<App />);

    fireEvent.click(screen.getByTestId('add-button'));

    const deleteButton = screen.getByTestId('delete-button-0');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
    expect(screen.queryByText('You can only have a maximum of 10 items in the to-do list.')).not.toBeInTheDocument();
  });
});
