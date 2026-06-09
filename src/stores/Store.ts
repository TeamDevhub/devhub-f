export class Store<T> {
  protected _state: T;
  private _listeners = new Set<() => void>();

  constructor(initialState: T) {
    this._state = initialState;
  }

  subscribe = (listener: () => void): (() => void) => {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  };

  getSnapshot = (): T => this._state;

  protected _setState(updates: Partial<T>): void {
    this._state = { ...this._state, ...updates };
    this._listeners.forEach((l) => l());
  }
}
