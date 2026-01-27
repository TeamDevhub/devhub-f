import { useCallback, useState } from 'react';

export type ValidationRule<V> = (value: V, allState: any) => string | null;
export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

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
    for (const rule of validations[key]!) {
      const error = rule(value, currentState);
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
    createHandler, 
    reset 
  } as const;
};