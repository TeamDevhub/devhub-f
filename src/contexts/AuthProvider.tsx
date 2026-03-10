import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { getUserProfile } from '@/api/profile/profile.api';

import type { UserBasicResponse } from '@/types/type.user';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserBasicResponse | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('accessToken'));

  const refreshUser = useCallback(async () => {
    try {
      const res = await getUserProfile();
      setUser(res.data?.user ?? undefined);
    } catch {
      setUser(undefined);
      setIsLoggedIn(false);
      sessionStorage.removeItem('accessToken');
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data?.user ?? undefined);
      } catch {
        setUser(undefined);
        setIsLoggedIn(false);
        sessionStorage.removeItem('accessToken');
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  const login = async (token?: string) => {
    if (!token) return;

    sessionStorage.setItem('accessToken', token);
    setIsLoggedIn(true);

    await refreshUser();
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    setUser(undefined);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        setUser,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
