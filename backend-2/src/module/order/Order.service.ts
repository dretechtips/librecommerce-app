import { Injectable } from "@nestjs/common";
import TagService from "src/common/services/Tag.service";
import { OrderDOT } from "./Order.interface";

@Injectable()
export class OrderService {
  constructor(public readonly tags: TagService<OrderDOT>) {}
}

export default OrderService;