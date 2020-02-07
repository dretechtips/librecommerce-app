import { Injectable } from "@nestjs/common";
import TagService from "src/app/common/tag/Tag.service";
import { OrderDOT } from "./Order.interface";
import ServiceFactory from "src/app/common/service/Service.factory";
import Order from "./Order.model";

@Injectable()
export class OrderService extends ServiceFactory(Order) {
  constructor(public readonly tags: TagService<OrderDOT>) {
    super();
  }
}

export default OrderService;
