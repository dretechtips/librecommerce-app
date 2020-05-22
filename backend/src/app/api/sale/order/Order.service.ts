import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import { OrderDOT } from "./Order.interface";
import Order from "./Order.model";
import { InjectModel } from "src/app/common/model/Model.decorator";

@Injectable()
export class OrderService extends Service<Order> {

  constructor(
    @InjectModel(Order) public readonly order: Order,
  ) {
    super();
  }

  public default(): Order {
    const order: OrderDOT = {
      cancelled: false,
      isHeld: false,
      isComplete: false,
    }
    return new Order(order);
  }

  
  
}

export default OrderService;
