export type ValidationRule<V, T = unknown> = (value: V, allState: T) => string | null;
export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K], T>[];
};

type ArrayKeys<T> = {
  [K in keyof T]: NonNullable<T[K]> extends unknown[] ? K : never;
}[keyof T];

type ElementOf<T> = NonNullable<T> extends (infer U)[] ? U : never;

export interface FormSnapshot<T> {
  state: T;
  errors: Partial<Record<keyof T, string>>;
}

export interface FieldSnapshot<V> {
  value: V;
  error: string | undefined;
}

export interface FormOptions<T> {
  validations?: ValidationRules<T>;
  mode?: 'onChange' | 'manual';
}

export class FormController<T extends object> {
  private _state: T;
  private _errors: Partial<Record<keyof T, string>> = {};
  private _initialState: T;
  private _validations?: ValidationRules<T>;
  private _mode: 'onChange' | 'manual';

  private _listeners = new Set<() => void>();
  private _fieldListeners = new Map<keyof T, Set<() => void>>();

  private _snapshot: FormSnapshot<T>;
  private _fieldSnapshots = new Map<keyof T, FieldSnapshot<unknown>>();

  constructor(initialState: T, options?: FormOptions<T>) {
    this._state = { ...initialState };
    this._initialState = initialState;
    this._validations = options?.validations;
    this._mode = options?.mode ?? 'onChange';
    this._snapshot = { state: this._state, errors: this._errors };
  }

  // ── whole-form subscription ──────────────────────────────────

  subscribe = (listener: () => void): (() => void) => {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  };

  getSnapshot = (): FormSnapshot<T> => this._snapshot;

  // ── per-field subscription ────────────────────────────────────

  subscribeField = <K extends keyof T>(key: K, listener: () => void): (() => void) => {
    if (!this._fieldListeners.has(key)) {
      this._fieldListeners.set(key, new Set());
    }
    this._fieldListeners.get(key)!.add(listener);
    return () => this._fieldListeners.get(key)!.delete(listener);
  };

  getFieldSnapshot = <K extends keyof T>(key: K): FieldSnapshot<T[K]> => {
    if (!this._fieldSnapshots.has(key)) {
      this._fieldSnapshots.set(key, {
        value: this._state[key],
        error: this._errors[key],
      });
    }
    return this._fieldSnapshots.get(key) as FieldSnapshot<T[K]>;
  };

  // ── mutations ─────────────────────────────────────────────────

  handleChange = <K extends keyof T>(key: K, value: T[K]): void => {
    this._state = { ...this._state, [key]: value };

    if (this._mode === 'onChange') {
      const error = this._getFieldError(key, value, this._state) || undefined;
      this._errors = { ...this._errors, [key]: error };
    }

    this._fieldSnapshots.set(key, { value, error: this._errors[key] });
    this._fieldListeners.get(key)?.forEach((l) => l());

    this._snapshot = { state: this._state, errors: this._errors };
    this._listeners.forEach((l) => l());
  };

  setState = (updates: Partial<T>): void => {
    this._state = { ...this._state, ...updates };

    for (const key of Object.keys(updates) as (keyof T)[]) {
      this._fieldSnapshots.set(key, { value: this._state[key], error: this._errors[key] });
      this._fieldListeners.get(key)?.forEach((l) => l());
    }

    this._snapshot = { state: this._state, errors: this._errors };
    this._listeners.forEach((l) => l());
  };

  createToggle = <K extends ArrayKeys<T>>(key: K) => {
    return (value: ElementOf<T[K]>) => {
      const current = (this._state[key] as unknown[]) || [];
      if (value === '') {
        this.handleChange(key, [] as T[K]);
        return;
      }
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      this.handleChange(key, next as T[K]);
    };
  };

  checkError = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let hasError = false;

    for (const key of Object.keys(this._initialState) as (keyof T)[]) {
      const error = this._getFieldError(key, this._state[key], this._state) || undefined;
      if (error) {
        newErrors[key] = error;
        hasError = true;
      }
    }

    this._errors = newErrors;

    for (const key of Object.keys(this._initialState) as (keyof T)[]) {
      this._fieldSnapshots.set(key, { value: this._state[key], error: this._errors[key] });
      this._fieldListeners.get(key)?.forEach((l) => l());
    }

    this._snapshot = { state: this._state, errors: this._errors };
    this._listeners.forEach((l) => l());

    return hasError;
  };

  reset = (): void => {
    this._state = { ...this._initialState };
    this._errors = {};

    for (const key of Object.keys(this._initialState) as (keyof T)[]) {
      this._fieldSnapshots.set(key, { value: this._state[key], error: undefined });
      this._fieldListeners.get(key)?.forEach((l) => l());
    }

    this._snapshot = { state: this._state, errors: this._errors };
    this._listeners.forEach((l) => l());
  };

  getState = (): T => this._state;

  private _getFieldError = <K extends keyof T>(key: K, value: T[K], state: T): string => {
    if (!this._validations?.[key]) return '';
    for (const rule of this._validations[key]!) {
      const error = (rule as (v: T[K], s: T) => string | undefined)(value, state);
      if (error) return error;
    }
    return '';
  };
}
