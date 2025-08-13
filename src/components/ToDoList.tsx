import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useTodos } from '../hooks/useTodos';
import { Moon, Sun, ListTodo, LogOut, Trash, ListPlus, Pencil } from 'lucide-react';
import './ToDoList.css';

export const ToDoList: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { todos, toggleTodo, updateTodo, deleteTodo, addTodo } = useTodos();
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const handleLogout = (): void => {
    logout();
  };

  const handleTodoToggle = (todoId: string): void => {
    toggleTodo(todoId);
  };

  const handleEditToggle = (todoId: string): void => {
    setEditingTodoId(prev => prev === todoId ? null : todoId);
  };

  const handleEditChange = (todoId: string, newTitle: string): void => {
    updateTodo(todoId, newTitle);
  };

  const handleEditBlur = (todoId?: string): void => {
    if (todoId) {
      const todo = todos.find(t => t.id === todoId);
      if (todo) {
        updateTodo(todoId, todo.title.trim());
      }
    }
    setEditingTodoId(null);
  };

  const handleDeleteTodo = (todoId: string): void => {
    deleteTodo(todoId);
  };

  const handleAddTodo = (): void => {
    const newTodoId = addTodo();
    setEditingTodoId(newTodoId);
  };

  return (
    <div className="todo-container">
      <div className="theme-toggle">
        <button 
          onClick={toggleTheme} 
          className="theme-btn"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button 
          onClick={handleLogout} 
          className="logout-btn"
          aria-label="Logout"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
      
      <div className="todo-card">
        <div className="todo-header">
          <ListTodo size={32} aria-hidden="true" />
          <h1>Your To-Do List</h1>
        </div>
        
        <div className="todo-content">
          <p>Welcome, {user?.name || 'Guest'}!</p>
          <p>Here you can manage your tasks.</p>

          <div className="todo-list" role="list">
            {todos.map((todo) => (
              <div className="todo-item" key={todo.id} role="listitem">
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => handleTodoToggle(todo.id)}
                  aria-label={`Mark "${todo.title}" as ${todo.checked ? 'incomplete' : 'complete'}`}
                />
                
                {editingTodoId === todo.id ? (
                  <input
                    type="text"
                    value={todo.title}
                    onChange={(e) => handleEditChange(todo.id, e.target.value)}
                    onBlur={() => handleEditBlur(todo.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleEditBlur(todo.id);
                      } else if (e.key === 'Escape') {
                        e.preventDefault();
                        setEditingTodoId(null);
                      }
                    }}
                    autoFocus
                    aria-label={`Edit todo: ${todo.title}`}
                  />
                ) : (
                  <span 
                    className={todo.checked ? 'checked_todo_label' : 'todo_label'}
                    onClick={() => handleEditToggle(todo.id)}
                  >
                    {todo.title}
                  </span>
                )}
                
                <div
                  className="todo-edit-btn"
                  onClick={() => handleEditToggle(todo.id)}
                  aria-label={`Edit "${todo.title}"`}
                >
                  <Pencil size={16} />
                </div>
                
                <div
                  className="todo-delete-btn"
                  onClick={() => handleDeleteTodo(todo.id)}
                  aria-label={`Delete "${todo.title}"`}
                >
                  <Trash size={16} />
                </div>
              </div>
            ))}
          </div>
          
          <button
            className="todo-add-btn"
            onClick={handleAddTodo}
            aria-label="Add new todo"
            type="button"
          >
            <ListPlus size={16} />
            <span>Add Task</span>
          </button>
          
          {todos.length === 0 && (
            <p className="no-todos" role="status">No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};