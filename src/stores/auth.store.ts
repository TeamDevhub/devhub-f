import { Store } from './Store';
import { getUserProfile } from '@/api/web/api.profile';
import { reissue } from '@/api/web/api.auth';
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

  private _tryReissue = async (): Promise<string | null> => {
    try {
      const res = await reissue();
      const token = res?.data?.accessToken;
      if (!token) return null;
      tokenStorage.set(token);
      return token;
    } catch {
      return null;
    }
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

    let token = tokenStorage.get();
    if (!token) {
      token = await this._tryReissue();
      if (!token) {
        this.logout();
        this._setState({ initialized: true });
        this.isInitializing = false;
        return;
      }
    }
    await this._fetchUserWithRetry();
    this._setState({ initialized: true });
    this.isInitializing = false;
  };

  login = async (token?: string): Promise<void> => {
    if (!token) return;
    tokenStorage.set(token);
    this._setState({ isLoggedIn: true });
    await this._fetchUserWithRetry();
  };

  logout = (): void => {
    tokenStorage.clear();
    this._setState({ user: undefined, isLoggedIn: false });
  };

  refreshUser = async (): Promise<void> => {
    await this._fetchUserWithRetry();
  };

  setUser = (user?: UserBasicResponse): void => {
    this._setState({ user });
  };
}

export const authStore = new AuthStore();
