import { Store } from './Store';
import { injectLoadingHandler } from '@/utils/util.api';

interface LoadingState {
  count: number;
  isLoading: boolean;
}

class LoadingStore extends Store<LoadingState> {
  constructor() {
    super({ count: 0, isLoading: false });
    injectLoadingHandler({ show: this.show, hide: this.hide });
  }

  show = (): void => {
    const count = this._state.count + 1;
    this._setState({ count, isLoading: true });
  };

  hide = (): void => {
    const count = Math.max(0, this._state.count - 1);
    this._setState({ count, isLoading: count > 0 });
  };
}

export const loadingStore = new LoadingStore();
