import { LinkedList } from './LinkedList';

export class StateList<T> {
  private _prev: LinkedList<State<T>>;
  private _cur: State<T>;
  constructor(state: T) {
    this._cur = new State<T>(state, this.setState);
    this._prev = new LinkedList<State<T>>();
  }
  private setState(state: T): State<T> {
    this._prev.append(this._cur);
    this._cur = new State<T>(state, this.setState);
    return this._cur;
  }
  public getCurrent(): State<T> {
    return this._cur;
  }
}

export class State<T> {
  private _state: T;
  private setState: (state: T) => State<T>;
  constructor(state: T, setState: (state: T) => State<T>) {
    this._state = state;
    this.setState = setState;
  }
  public next(callback: (state: T) => T): State<T> {
    const nextState: T = callback(this._state);
    return new State<T>(nextState, this.setState);
  }
  public catch() {}
  public get(): T {
    return this._state;
  }
}

export default StateList;
