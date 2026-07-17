import { useSyncExternalStore } from 'react';
import { modalStore } from '@/stores/modal.store';
import WebPopup from './WebPopup';

export default function ModalRenderer() {
  const { isOpen, config } = useSyncExternalStore(
    modalStore.subscribe,
    modalStore.getSnapshot,
  );

  return (
    <WebPopup isOpen={isOpen} {...config}>
      <p className="popup-message">{config.content}</p>
    </WebPopup>
  );
}
