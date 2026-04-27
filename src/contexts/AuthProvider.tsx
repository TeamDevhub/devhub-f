import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { getUserProfile } from '@/api/profile/profile.api';
import { reissue } from '@/api/auth/auth.api';

import type { UserBasicResponse } from '@/types/type.user';
import { setSessionStorage } from '@/utils/util._common.ts';
import axios from 'axios';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserBasicResponse | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = useCallback(() => {
    sessionStorage.removeItem('accessToken');
    setUser(undefined);
    setIsLoggedIn(false);
  }, []);

  const tryReissue = useCallback(async (): Promise<string | null> => {
    try {
      const res = await reissue();
      console.log('reissue response:', res);

      const newAccessToken = res?.data?.accessToken;

      if (!newAccessToken) return null;

      setSessionStorage('accessToken', newAccessToken);
      return newAccessToken;
    } catch (e) {
      console.log('reissue error:', e);
      return null;
    }
  }, []);

  const fetchUserWithRetry = useCallback(async () => {
    try {
      const res = await getUserProfile();
      setUser(res.data?.user ?? undefined);
      setIsLoggedIn(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        const newToken = await tryReissue();

        if (newToken) {
          try {
            const retryRes = await getUserProfile();
            setUser(retryRes.data?.user ?? undefined);
            setIsLoggedIn(true);
            return;
          } catch {
            logout();
            return;
          }
        }
      }

      logout();
    }
  }, [tryReissue, logout]);

  const refreshUser = useCallback(async () => {
    await fetchUserWithRetry();
  }, [fetchUserWithRetry]);

  useEffect(() => {
    const initAuth = async () => {
      let accessToken = sessionStorage.getItem('accessToken');

      if (!accessToken) {
        const newToken = await tryReissue();
        if (!newToken) {
          logout();
          return;
        }
        accessToken = newToken;
      }

      await fetchUserWithRetry();
    };

    initAuth();
  }, [tryReissue, fetchUserWithRetry, logout]);

  const login = useCallback(
    async (token?: string) => {
      if (!token) return;

      setSessionStorage('accessToken', token);
      setIsLoggedIn(true);

      await fetchUserWithRetry();
    },
    [fetchUserWithRetry],
  );

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
