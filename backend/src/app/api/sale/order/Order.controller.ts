import { Controller, Get, Param, Patch } from "@nestjs/common";
import { ValidateOrderIDPipe } from "./Order.pipe";
import OrderService from "./Order.service";

export const prefix = "order";

@Controller("order")
export class OrderController {
  constructor(private readonly order: OrderService) {}
  @Patch("hold/:orderID")
  public async hold(@Param("orderID", ValidateOrderIDPipe) orderID: string) {
    await this.order.hold(orderID);
  }
  @Patch("unhold/:orderID")
  public async unhold(@Param("orderID", ValidateOrderIDPipe) orderID: string) {
    await this.order.unhold(orderID);
  }
  @Get("fetch/:id")
  public async fetch(@Param("id", ValidateOrderIDPipe) orderID: string) {
    return (await this.order.get(orderID)).toJSON();
  }
  @Patch("complete/:id")
  public async complete(@Param("id", ValidateOrderIDPipe) orderID: string) {
    await this.order.complete(orderID);
  }
}

export default OrderController;
