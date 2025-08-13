import React, { Suspense } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoginForm } from './components/LoginForm';
import { ToDoList } from './components/ToDoList';
import './App.css';

interface LoadingSpinnerProps {
  size: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size }) => (
  <div 
    className="loading-spinner"
    style={{
      width: size,
      height: size,
    }}
    role="status"
    aria-label="Loading"
  />
);

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  return isAuthenticated ? <ToDoList /> : <LoginForm />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner size={32} />}>
          <AppContent />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
