// ABOUTME: Authentication context managing user login state and auth operations
// ABOUTME: Uses fake auth for testing, will be replaced with real API calls

import { createContext, useContext, useState, ReactNode } from 'react';
import { User, fakeAuth } from '../data/fakeData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, primaryContactName: string, companyName: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await fakeAuth.login(email, password);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, primaryContactName: string, companyName: string) => {
    setIsLoading(true);
    try {
      const user = await fakeAuth.signup(email, password, primaryContactName, companyName);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await fakeAuth.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
