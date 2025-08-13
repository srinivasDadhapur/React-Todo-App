import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import type { LoginCredentials } from '../types';
import { LogIn, Moon, Sun } from 'lucide-react';
import './LoginForm.css';

export const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({ 
    username: '', 
    password: '' 
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(credentials);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Login failed:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-container">
      <div className="theme-toggle">
        <button 
          onClick={toggleTheme} 
          className="theme-btn"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          type="button"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <LogIn size={32} aria-hidden="true" />
          <h1>Todos Login</h1>
          <p>Enter your credentials to access the Todos</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
              disabled={loading}
              aria-describedby="username-error"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              disabled={loading}
              aria-describedby="password-error"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading || !credentials.username || !credentials.password} 
            className="login-btn"
            aria-describedby="login-status"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="demo-info">
          <p>Demo: Use any username/password to login</p>
        </div>
      </div>
    </div>
  );
};