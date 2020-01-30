import { Injectable } from "@nestjs/common";
import TagService from "src/common/services/Tag.service";
import { OrderDOT } from "./Order.interface";
import ServiceFactory from "src/util/Service.factory";
import Order from "./Order.model";

@Injectable()
export class OrderService extends ServiceFactory<OrderDOT>(Order) {
  constructor(public readonly tags: TagService<OrderDOT>) {
    super();
  }
}

export default OrderService;
