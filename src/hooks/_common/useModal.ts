import { modalStore } from '@/stores/modal.store';

export const useModal = () => {
  const alert = (message: string): void => {
    modalStore.openModal({
      title: '알림',
      content: message,
      onSubmit: () => modalStore.closeModal(),
    });
  };

  const confirm = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      modalStore.openModal({
        title: '확인',
        content: message,
        onSubmit: () => { resolve(true); modalStore.closeModal(); },
        onClose: () => { resolve(false); modalStore.closeModal(); },
      });
    });
  };

  return { alert, confirm, closeModal: modalStore.closeModal };
};
