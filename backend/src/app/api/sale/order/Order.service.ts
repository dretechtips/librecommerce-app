import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import TagService from "src/app/common/tag/Tag.service";
import { OrderDOT } from "./Order.interface";
import Order from "./Order.model";

@Injectable()
export class OrderService extends Service<typeof Order> {
  constructor(public readonly tags: TagService<OrderDOT>) {
    super(Order);
  }
  public addDefault(): Promise<Order> {
    const order: OrderDOT = {
      cancelled: false,
      isHeld: false,
      complete: false
    };
    return this.add(order);
  }
  public async hold(orderID: string) {
    const order = await this.get(orderID);
    order.isHeld = true;
    await order.save();
  }
  public async unhold(orderID: string) {
    const order = await this.get(orderID);
    order.isHeld = false;
    await order.save();
  }
  public async complete(orderID: string) {
    const order = await this.get(orderID);
    order.complete = true;
    await order.save();
  }
  public async cancel(orderID: string): Promise<void> {
    const order = await this.get(orderID);
    order.cancelled = true;
    await order.save();
  }
}

export default OrderService;
