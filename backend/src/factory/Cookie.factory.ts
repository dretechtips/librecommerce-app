export class CookieFactory {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  public new(prop: string): CookieKey {
    return new CookieKey(this._name + '_' + prop);
  }
}

export class CookieKey<T = string> {
  private _value: string;
  private _type: T;
  constructor(key: string) {
    this._value = key;
  }
  public new<T>(prop: string): CookieKey<T> {
    return new CookieKey<T>(this._value + '_' + prop);
  }
  public string(): string {
    return this._value;
  }
  public type(): T {
    return this._type;
  }
}

export default CookieFactory;
