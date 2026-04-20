import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { getUserProfile } from '@/api/profile/profile.api';
import { reissue } from '@/api/auth/auth.api';

import type { UserBasicResponse } from '@/types/type.user';
import { setSessionStorage } from '@/utils/util._common.ts';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserBasicResponse | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('accessToken'));

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      reissue()
        .then((res) => {
          const newAccessToken = res?.data?.accessToken;
          if (newAccessToken) {
            setSessionStorage('accessToken', newAccessToken);
            setIsLoggedIn(true);
          }
        })
        .catch(() => {
          setIsLoggedIn(false);
        });
    }
  }, []);

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

    setSessionStorage('accessToken', token);
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
