import { Store } from './Store';
import { getUserProfile } from '@/api/web/api.profile';
import { reissue } from '@/api/web/api.auth';
import { tokenStorage } from '@/utils/auth.token';
import type { UserBasicResponse } from '@/types/type.user';
import axios from 'axios';

interface AuthState {
  user: UserBasicResponse | undefined;
  isLoggedIn: boolean;
  initialized: boolean;
}

class AuthStore extends Store<AuthState> {
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

  private _fetchUserWithRetry = async (): Promise<void> => {
    try {
      const res = await getUserProfile();
      this._setState({ user: res.data?.user ?? undefined, isLoggedIn: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        const token = await this._tryReissue();
        if (token) {
          try {
            const res = await getUserProfile();
            this._setState({ user: res.data?.user ?? undefined, isLoggedIn: true });
            return;
          } catch {
            this.logout();
            return;
          }
        }
      }
      this.logout();
    }
  };

  init = async (): Promise<void> => {
    let token = tokenStorage.get();
    if (!token) {
      token = await this._tryReissue();
      if (!token) {
        this.logout();
        this._setState({ initialized: true });
        return;
      }
    }
    await this._fetchUserWithRetry();
    this._setState({ initialized: true });
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
