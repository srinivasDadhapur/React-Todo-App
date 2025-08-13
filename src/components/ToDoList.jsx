import { useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, ListTodo, LogOut, Trash, ListPlus, Pencil } from 'lucide-react';
import './ToDoList.css';

export const ToDoList = () => {
  const { theme, toggleTheme } = useTheme();
  const [editingTodoId, setEditingTodoId] = useState(null);
  const { user, logout } = useAuth();
   const handleLogout = () => {
    logout();
  };
  const [todos, setTodos] = useState([
    { id: '1', checked: false, title: 'Revenue by Region'},
    { id: '2', checked: false, title: 'Key Metrics'},
    { id: '3', checked: false, title: 'Recent Orders'},
    { id: '4', checked: false, title: 'Impressions by Campaign'}
  ]);

  const handleTodoToggle = useMemo(() => (todoId) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === todoId 
          ? { ...todo, checked: !todo.checked }
          : todo
      )
    );
  }, []);
  const handleDeleteToggle = useMemo(() => (todoId) => {
    setTodos(prevTodos => 
      prevTodos.filter(todo => todo.id !== todoId)
    );
  }, []);

  const handleEditToggle = useMemo(() => (todoId) => {
    setEditingTodoId(prev => prev === todoId ? null : todoId);
  }, []);

  const handleEditChange = useMemo(() => (todoId, newTitle) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === todoId 
          ? { ...todo, title: newTitle }
          : todo
      )
    );
  }, []);

return (
    <div className="todo-container">
            <div className="theme-toggle">
                    <button onClick={toggleTheme} className="theme-btn">
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                            <button onClick={handleLogout} className="logout-btn">
                                                    <LogOut size={16} />
                                                    <span>Logout</span>
                                            </button>
            </div>
            
            <div className="todo-card">
                    <div className="todo-header">
                            <ListTodo size={32} /> <h1>Your To-Do List</h1>
                    </div>
                    <div className="todo-content">
                            <p>Welcome, {user?.name || 'Guest'}!</p>
                            <p>Here you can manage your tasks.</p>

                            <div className="todo-list">
                                    {todos.map((todo) => (
                                            <div className="todo-item" key={todo.id}>
                                                    <input
                                                            type="checkbox"
                                                            checked={todo.checked}
                                                            onChange={() => handleTodoToggle(todo.id)}
                                                    />
                                                    {editingTodoId === todo.id ? <input type="text" value={todo.title} onChange={(e) => handleEditChange(todo.id, e.target.value)} onBlur={() => setEditingTodoId(null)} /> :  <label className={todo.checked ? 'checked_todo_label' : 'todo_label'}>
                                                            { todo.title}
                                                    </label>}
                                                    <div className="todo-delete-btn" onClick={() => handleDeleteToggle(todo.id)}>
                                                             <Trash size={16} />
                                                    </div>
                                                     <div className="todo-edit-btn" onClick={() => handleEditToggle(todo.id)}>
                                                             <Pencil size={16} />
                                                    </div>
                                            </div>
                                    ))}
                            </div>
                            <div className="todo-add-btn" onClick={() => setTodos([...todos, { id: Date.now().toString(), checked: false, title: 'New Task' }])}>
                                    <ListPlus size={16} /> 
                            </div>
                            {todos.length === 0 && <p className="no-todos">No tasks available.</p>}
                    </div>
            </div>
    </div>
);
};  