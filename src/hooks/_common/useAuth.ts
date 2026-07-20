import { useSyncExternalStore } from 'react';
import { authStore } from '@/stores/auth.store';
import type { UserDetailResponse } from '@/types/type.user';

export const useAuth = () => {
  const { user, positionList, skillList, passwordLoginAvailable, isLoggedIn, initialized } = useSyncExternalStore(
    authStore.subscribe,
    authStore.getSnapshot,
  );

  // /user/profile 상세 응답이 필요한 화면(내 정보 홈/수정, 지원서 작성)이 로그인 시 이미 받아온
  // 데이터를 그대로 재사용할 수 있도록 조합해 제공한다 - 중복 요청 방지.
  const profile: UserDetailResponse | undefined = user
    ? { user, positionList, skillList, passwordLoginAvailable }
    : undefined;

  return {
    user,
    positionList,
    skillList,
    passwordLoginAvailable,
    profile,
    isLoggedIn,
    initialized,
    login: authStore.login,
    logout: authStore.logout,
    refreshUser: authStore.refreshUser,
    setUser: authStore.setUser,
  };
};
