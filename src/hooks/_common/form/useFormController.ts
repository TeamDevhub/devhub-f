import { useState } from 'react';
import { FormController, type FormOptions } from './FormController';

export function useFormController<T extends object>(
  initialState: T,
  options?: FormOptions<T>
): FormController<T> {
  const [controller] = useState(() => new FormController(initialState, options));

  return controller;
}