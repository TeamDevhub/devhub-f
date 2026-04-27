import { useSyncExternalStore } from 'react';
import { useFormController } from './form/useFormController';
import type { FormOptions } from './form/FormController';

export type { ValidationRule, ValidationRules } from './form/FormController';

const useFormState = <T extends object>(
  initialState: T,
  options?: FormOptions<T>
) => {
  const controller = useFormController(initialState, options);

  const { state, errors } = useSyncExternalStore(
    controller.subscribe,
    controller.getSnapshot,
  );

  return {
    state,
    errors,
    setState: controller.setState,
    handleChange: controller.handleChange,
    createHandler: <K extends keyof T>(key: K) => (value: T[K]) => controller.handleChange(key, value),
    createToggle: controller.createToggle,
    checkError: controller.checkError,
    reset: controller.reset,
    controller,
  } as const;
};

export default useFormState;
