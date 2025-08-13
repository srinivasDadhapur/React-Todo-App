import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, LoginCredentials, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser) as User;
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Failed to parse saved user data:', error);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<User> => {
    const userData: User = {
      id: 1,
      username: credentials.username,
      email: credentials.email || `${credentials.username}@example.com`,
      name: credentials.name || credentials.username
    };
    
    setUser(userData);
    try {
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
    return userData;
  };

  const logout = (): void => {
    setUser(null);
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('dashboardState');
    } catch (error) {
      console.error('Failed to clear user data:', error);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};