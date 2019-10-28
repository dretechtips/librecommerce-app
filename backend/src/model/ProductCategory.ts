export class ProductCategory {
  private _name: string;
  private _id: string;
  constructor(name: string, id: string) {
    this._name = name;
    this._id = id;
  }
  public static import(id: string): ProductCategory {
    // Database Method
  }
  public static importAll(): ProductCategory[] {
    // Database Method
  }
  public getID(): string {
    return this._id;
  }
  public toPrimObj(): {name: string, id: string} {
    const obj = {
      name: this._name,
      id: this._id,
    }
    return obj;
  }
}


export default ProductCategory;