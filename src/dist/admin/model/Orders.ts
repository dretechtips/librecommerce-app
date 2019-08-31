import { default as Database } from "./Database";
import { OrderConstructor } from "../interface/Order.interface";

export class Orders {
  public async static Add(order: OrderConstructor): Promise<boolean>
  {
    
  }
  public async static Remove(orderID: string): Promise<boolean>
  {

  }
  public async static Modify(order: OrderConstructor, orderID: string): Promise<boolean>
  {
    
  }
}