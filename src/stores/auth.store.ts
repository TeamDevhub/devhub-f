import { Store } from './Store';
import { getUserProfile } from '@/api/web/api.profile';
import { logout } from '@/api/web/api.auth';
import { triggerReissue } from '@/utils/util.api';
import { tokenStorage } from '@/utils/auth.token';
import type { UserBasicResponse } from '@/types/type.user';

interface AuthState {
  user: UserBasicResponse | undefined;
  isLoggedIn: boolean;
  initialized: boolean;
}

class AuthStore extends Store<AuthState> {
  private isInitializing = false;

  constructor() {
    super({ user: undefined, isLoggedIn: false, initialized: false });
  }

  // util.api.ts의 단일 promise 큐를 그대로 사용 — 인터셉터의 401 재발급과
  // 여기서의 초기화 재발급이 동시에 발생해도 실제 reissue 호출은 한 번만 나간다.
  private _tryReissue = async (): Promise<string | null> => {
    return triggerReissue();
  };

  // 인터셉터가 EXPIRE_ACCESS_TOKEN 재발급 및 재시도를 이미 처리하므로 추가 재시도 불필요
  private _fetchUserWithRetry = async (): Promise<void> => {
    try {
      const res = await getUserProfile();
      this._setState({ user: res.data?.user ?? undefined, isLoggedIn: true });
    } catch {
      this.logout();
    }
  };

  init = async (): Promise<void> => {
    if (this.getSnapshot().initialized || this.isInitializing) return;

    this.isInitializing = true;

    try {
      let token = tokenStorage.get();

      const hasSession = localStorage.getItem('hasSession') === 'true';

      // accessToken 있음
      if (token) {
        await this._fetchUserWithRetry();
        return;
      }

      // OAuth 로그인 또는 기존 로그인 복구 대상
      if (hasSession) {
        token = await this._tryReissue();

        if (token) {
          await this._fetchUserWithRetry();
        }

        return;
      }

      // 완전 비로그인
      this._setState({
        user: undefined,
        isLoggedIn: false,
      });
    } finally {
      this._setState({
        initialized: true,
      });

      this.isInitializing = false;
    }
  };

  login = async (token?: string): Promise<void> => {
    if (!token) return;
    tokenStorage.set(token);
    localStorage.setItem('hasSession', 'true');
    this._setState({ isLoggedIn: true });
    await this._fetchUserWithRetry();
  };

  logout = async (): Promise<void> => {
    try {
      await logout();
    } catch {
      // API 실패해도 프론트는 로그아웃
    }

    tokenStorage.clear();
    localStorage.removeItem('hasSession');

    this._setState({
      user: undefined,
      isLoggedIn: false,
    });
  };

  refreshUser = async (): Promise<void> => {
    await this._fetchUserWithRetry();
  };

  setUser = (user?: UserBasicResponse): void => {
    this._setState({ user });
  };
}

export const authStore = new AuthStore();
