import { ServerError } from '../type/Error';

export class ImmutableArray<T> {
  private _array: T[];
  constructor(array: T[], size: number) {
    if (array.length !== size)
      throw new ServerError(
        'An immutable array cannot be instantiated with a length not equal to the size defined by the user.'
      );
    this._array = array;
    Object.freeze(this._array);
  }
  public toMutableArray() {
    return this._array.slice(0, this._array.length);
  }
}

export default ImmutableArray;
