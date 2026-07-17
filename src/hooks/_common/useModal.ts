import { modalStore } from '@/stores/modal.store';
import type { DialogVariant } from '@/types/type.dialog';

interface AlertOptions {
  title?: string;
  variant?: DialogVariant;
}

interface ConfirmOptions {
  title?: string;
  submitText?: string;
  variant?: DialogVariant;
}

export const useModal = () => {
  const alert = (message: string, options?: AlertOptions): void => {
    modalStore.openModal({
      title: options?.title ?? '알림',
      content: message,
      variant: options?.variant,
      onSubmit: () => modalStore.closeModal(),
    });
  };

  const confirm = (message: string, options?: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      modalStore.openModal({
        title: options?.title ?? '확인',
        content: message,
        submitText: options?.submitText,
        variant: options?.variant ?? 'confirm',
        onSubmit: () => { resolve(true); modalStore.closeModal(); },
        onClose: () => { resolve(false); modalStore.closeModal(); },
      });
    });
  };

  return { alert, confirm, closeModal: modalStore.closeModal };
};
