import { useState, useCallback, useEffect } from 'react';
import type { Todo } from '../types';

const TODOS_STORAGE_KEY = 'todos';

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const defaultTodos: Todo[] = [
  {
    id: generateId(),
    title: 'Revenue by Region',
    checked: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: generateId(),
    title: 'Key Metrics',
    checked: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: generateId(),
    title: 'Recent Orders',
    checked: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: generateId(),
    title: 'Impressions by Campaign',
    checked: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage on mount
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt)
        }));
        setTodos(parsedTodos);
      } else {
        setTodos(defaultTodos);
      }
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error);
      setTodos(defaultTodos);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      try {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.error('Failed to save todos to localStorage:', error);
      }
    }
  }, [todos]);

  const toggleTodo = useCallback((todoId: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId
          ? { ...todo, checked: !todo.checked, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  const updateTodo = useCallback((todoId: string, newTitle: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId
          ? { ...todo, title: newTitle, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((todoId: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  }, []);

  const addTodo = useCallback((title: string = 'New Task') => {
    const newTodo: Todo = {
      id: generateId(),
      title: title.trim(),
      checked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
    return newTodo.id;
  }, []);

  return {
    todos,
    toggleTodo,
    updateTodo,
    deleteTodo,
    addTodo
  };
};