import { default as Database } from "./Database";
import { OrderConstructor } from "../interface/Order.interface";
import { DatabaseKeyValue } from "../interface/Database.interface";

export class Orders
{
  
  public static async Add(order: OrderConstructor): Promise<boolean>
  {
    
  }
  public static async Remove(orderID: string): Promise<boolean>
  {

  }
  public static async Modify(order: DatabaseKeyValue, orderID: string): Promise<boolean>
  {
    
  }
}