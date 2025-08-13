import { Suspense } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoginForm } from './components/LoginForm';
import { ToDoList } from './components/ToDoList';
import './App.css'
const LoadingSpinner = ({ size }: { size: number }) => (
  <div 
    style={{
      width: size,
      height: size,
      border: '2px solid #f3f3f3',
      borderTop: '2px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}
  />
);


const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh' 
      }}>
        <LoadingSpinner size={32} />
      </div>
    );
  }

  return isAuthenticated ? <ToDoList /> : <LoginForm />;
}

function App() {
  // const [count, setCount] = useState(0)

  return (
          <ThemeProvider>
          <AuthProvider>
          <Suspense fallback={<LoadingSpinner size={32} />}>
              <AppContent />
            </Suspense>
          </AuthProvider>
          </ThemeProvider>
  )
}

export default App
