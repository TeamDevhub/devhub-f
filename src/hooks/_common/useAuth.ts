import { useSyncExternalStore } from 'react';
import { authStore } from '@/stores/auth.store';

export const useAuth = () => {
  const { user, isLoggedIn, initialized } = useSyncExternalStore(
    authStore.subscribe,
    authStore.getSnapshot,
  );

  return {
    user,
    isLoggedIn,
    initialized,
    login: authStore.login,
    logout: authStore.logout,
    refreshUser: authStore.refreshUser,
    setUser: authStore.setUser,
  };
};
