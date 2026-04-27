import { useRef, type MutableRefObject } from 'react';
import { FormController, type FormOptions } from './FormController';

export function useFormController<T extends object>(
  initialState: T,
  options?: FormOptions<T>
): FormController<T> {
  const ref = useRef<FormController<T>>(null);
  if (!ref.current) {
    (ref as MutableRefObject<FormController<T>>).current = new FormController(initialState, options);
  }
  return ref.current!;
}
