import { createContext, useContext } from 'react';

import type { UserBasicResponse } from '@/types/type.user';

interface AuthContextType {
  isLoggedIn?: boolean;
  user?: UserBasicResponse;
  setUser: (user?: UserBasicResponse) => void;
  login?: (token?: string) => void;
  logout?: () => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
