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
  constructor() {
    super({ isOpen: false, config: DEFAULT_CONFIG });
  }

  openModal = (config: ModalConfig): void => {
    this._setState({ isOpen: true, config });
  };

  closeModal = (): void => {
    this._setState({ isOpen: false });
  };
}

export const modalStore = new ModalStore();
