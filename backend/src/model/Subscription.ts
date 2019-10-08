import { ISubscription } from "../interface/Subscription.interface";
import { Product, ProductManager, ProductVariation, ProductVariationManager } from "./Inventory";
import { Money } from "../type/Money";
import { Discount } from "../type/Discount";
import uuid = require('uuid/v4');
import { ServerError } from "../type/Error";
import { Customer, CustomerManager } from "./Customer";

export class Subscription {
  private _customerID: string;
  private _packages: Package[];
  public finder: PackageFinder;
  constructor(customer: Customer) {
    const packageIDs: string[] = customer.getSubscriptionPackagesID();
    this._packages = Array<Package>(this._packages.length);
    for (let i = 0; i < this._packages.length; i++) {
      const pack: Package | null = PackageManager.from.id(packageIDs[i]);
      if (pack)
        this._packages[i] = pack;
    }
    this.finder = new PackageFinder(this._packages);
    this._customerID = customer.getID();
  }
  public toPrimObj(): void {

  }
  public listPackages(): Package[] {
    return this._packages;
  }
  public static generate(sub: ISubscription.Customer.Body): Subscription {
    const obj: ISubscription.Customer.Constructor = {
      ...sub
    }
    return new Subscription(obj);
  }
}

export class PackageManager {
  public static from = class {
    public static id(id: string): Package | null {
      // Database Method
    }
    public static products(products: Product[]): Package[] | null {
      // Database Method
    }
    public static all(): Package[] | null {
      // Database Method
    }
    public static active(): Package[] | null {
      // Database Method
    }
    public static admin(): Package[] | null {
      // Databasem
    }
  }
}

class PackageFinder {
  private _packages: Package[];
  constructor(packages: Package[]) {
    this._packages = packages;
  }
  public id(id: string): Package | null {
    const pack: Package | undefined = this._packages.find(cur => cur.getID() === id);
    if (pack)
      return pack;
    else
      return null;
  }
  public index(index: number): Package | null {
    if (index > this._packages.length - 1)
      return null;
    else
      return this._packages[index];
  }
}

export type PackageOwner = "client" | "admin"

export class Package {
  private _productsID: string[];
  private _discount: Discount;
  private _id: string;
  private _name: string;
  private _type: PackageOwner;
  constructor(name: string, productsID: string[], discount?: Discount) {
    try {
      this._name = name;
      this._id = uuid();
      if (productsID.length === 0)
        throw new ServerError("A subscription package cannot be created with zero products.");
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public getID(): string {
    return this._id;
  }
  public save(): void {
    // Database Method
  }
  public setType(type: PackageOwner): void {
    this._type = type;
  }
  public getType(): PackageOwner {
    return this._type;
  }
  public update(body: any): void {

  }
  public delete(): void {
    // Database Method
  }
  public getPrice(): Money {
    let tPrice: Money = new Money(0);
    for (let i = 0; i < this._productsID.length; i++) {
      const curID: string = this._productsID[i];
      const cur: ProductVariation | null = ProductVariationManager.from.id(curID);
      if (cur) {
        const cost: Money = cur.getCost();
        tPrice = tPrice.add(cost);
      }
    }
    if (this._discount)
      return tPrice.reduce(this._discount);
    else
      return tPrice;
  }
  public toPrimObj(): void {

  }
}