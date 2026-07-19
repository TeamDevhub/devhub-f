import { Store } from './Store';
import type { DialogVariant } from '@/types/type.dialog';

export interface ModalConfig {
  title: string;
  content?: string;
  submitText?: string;
  variant?: DialogVariant;
  onSubmit: () => void;
  onClose?: () => void;
}

interface ModalState {
  isOpen: boolean;
  config: ModalConfig;
}

const DEFAULT_CONFIG: ModalConfig = {
  title: '',
  content: '',
  onSubmit: () => {},
};

class ModalStore extends Store<ModalState> {
  private queue: ModalConfig[] = [];

  constructor() {
    super({ isOpen: false, config: DEFAULT_CONFIG });
  }

  // 이미 모달이 열려있으면 새 요청은 큐에 쌓아두고, 현재 모달이 닫힐 때 순서대로 띄운다.
  // 즉시 덮어쓰면 이전 모달의 Promise(confirm 등)가 영영 resolve되지 않기 때문.
  openModal = (config: ModalConfig): void => {
    if (this.getSnapshot().isOpen) {
      this.queue.push(config);
      return;
    }
    this._setState({ isOpen: true, config });
  };

  closeModal = (): void => {
    const next = this.queue.shift();
    if (next) {
      this._setState({ isOpen: true, config: next });
      return;
    }
    this._setState({ isOpen: false });
  };
}

export const modalStore = new ModalStore();
