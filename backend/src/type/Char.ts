export class Char
{
  private _value: number;
  constructor(char: string | number)
  {
    if (typeof char === "number") {
      this._value = char;
    }
    else {
      this._value = char.charCodeAt(0);
    }
  }
  public get getValue(): string
  {
    return String.fromCharCode(this._value);
  }
  public toString()
  {
    return String.fromCharCode(this._value);
  }
}

