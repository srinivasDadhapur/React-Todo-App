export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  email?: string;
  name?: string;
}

export interface Todo {
  id: string;
  title: string;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isDark: boolean;
}