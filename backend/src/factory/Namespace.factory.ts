export class NamespaceFactory {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  public new(prop: string): NamespaceKey {
    return new NamespaceKey(this._name + '_' + prop);
  }
}

export class NamespaceKey<T = string> {
  private _value: string;
  private _type: T;
  constructor(key: string) {
    this._value = key;
  }
  public new<T>(prop: string): NamespaceKey<T> {
    return new NamespaceKey<T>(this._value + '_' + prop);
  }
  public string(): string {
    return this._value;
  }
  public type(): T {
    return this._type;
  }
}

export default NamespaceFactory;
