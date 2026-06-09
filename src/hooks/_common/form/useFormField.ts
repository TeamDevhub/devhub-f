import { useSyncExternalStore } from 'react';
import type { FormController } from './FormController';

export function useFormField<T extends object, K extends keyof T>(
  controller: FormController<T>,
  key: K
) {
  const snapshot = useSyncExternalStore(
    (listener) => controller.subscribeField(key, listener),
    () => controller.getFieldSnapshot(key),
  );

  return {
    value: snapshot.value,
    error: snapshot.error,
    onChange: (value: T[K]) => controller.handleChange(key, value),
  };
}
