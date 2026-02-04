import { useCallback, useState } from 'react';

export type ValidationRule<V> = (value: V, allState: never) => string | null;
export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

type ArrayKeys<T> = {
  [K in keyof T]: NonNullable<T[K]> extends never[] ? K : never;
}[keyof T];

type ElementOf<T> = NonNullable<T> extends (infer U)[] ? U : never;

export const useFormState = <T extends object>(
  initialState: T,
  options?: {
    validations?: ValidationRules<T>;
    mode?: 'onChange' | 'manual';
  }
) => {  

  const [state, setState] = useState<T>(initialState);
  const [errors, setErrors] = useState<{ [K in keyof T]?: string }>({});

  const { validations, mode = 'onChange' } = options || {};

  const getFieldError = useCallback(<K extends keyof T>(key: K, value: T[K], currentState: T) => {
    if (!validations || !validations[key]) return "";
    for (const rule of validations[key]) {
      const error = (rule as (v: T[K], s: T) => string | undefined)(value, currentState);
      if (error) return error;
    }
    return "";
  }, [validations]);

  const checkError = useCallback(() => {
    if (mode === 'onChange') {
      return Object.values(errors).some((msg) => !!msg);
    }

    const newErrors: { [K in keyof T]?: string } = {};
    let hasError = false;

    (Object.keys(initialState) as (keyof T)[]).forEach((key) => {
      const error = getFieldError(key, state[key], state);
      if (error) {
        newErrors[key] = error;
        hasError = true;
      }
    });

    setErrors(newErrors);
    return hasError;
  }, [mode, errors, state, initialState, getFieldError]);

  const handleChange = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setState((prev) => {
      const newState = { ...prev, [key]: value };
      
      if (mode === 'onChange') {
        const error = getFieldError(key, value, newState);
        setErrors((prevErrors) => ({ ...prevErrors, [key]: error }));
      }
      
      return newState;
    });
  }, [mode, getFieldError]);

  const createHandler = useCallback(<K extends keyof T>(key: K) => {
    return (value: T[K]) => handleChange(key, value);
  }, [handleChange]);

  const createToggle = useCallback(<K extends ArrayKeys<T>>(key: K) => {
    return (value: ElementOf<T[K]>) => {
      const currentValues = (state[key] as unknown as never[]) || [];

      if (value === '') {
        handleChange(key, [] as unknown as T[K]);
        return;
      }
      const isIncluded = currentValues.includes(value as never);
      const nextValues = isIncluded
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      handleChange(key, nextValues as unknown as T[K]);
    };
  }, [state, handleChange]);

  const reset = useCallback(() => {
    setState(initialState);
    setErrors({});
  }, [initialState]);

  return { 
    state, 
    errors, 
    checkError, 
    setState, 
    handleChange, 
    createToggle,
    createHandler, 
    reset 
  } as const;
};