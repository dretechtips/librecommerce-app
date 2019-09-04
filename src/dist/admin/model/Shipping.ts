import { DatabaseQueryConstructor } from "../interface/Database.interface";
import { ShippingConstructor, NewShippingBody } from "../interface/Shipping.interface";
import { DatabaseQuery, Database } from "./Database";
import { Queue } from "../data/Queue";
import { Order } from "./Order";
import { Money } from "./Money";

// export class Shipping
// {
//   private _details: DatabaseQueryConstructor;
//   public static add(shipping: ShippingConstructor)
//   {
    
//   }
//   public static remove()
//   {

//   }
//   public static update()
//   {
    
//   }
// }

export class ShippingQueue extends Queue
{
  protected _values: Shipping[];
  enqueue(shipping: Shipping)
  {
    this._values.push(shipping);
  }
  dequeue()
  {
    const shipping = this._values.pop();
    shipping.save();
  }
}

export class Shipping
{
  private _values: ShippingConstructor;
  constructor(shipping: ShippingConstructor)
  {
    
  }
  public save()
  {
    
  }
  public setID(id: string): void
  {
    this._values.orderID = id;
  }
  public static generate(body: NewShippingBody)
  {
    const shipping: ShippingConstructor = 
    {
      days: body.days,
      price: new Money(body.price),
      provider: body.provider,
      cancelled: false,
    }
    return new Shipping(shipping);
  }
  public static From = class
  {
    public static id()
    {
      
    }
  }
}