import { Module } from "@nestjs/common";
import OrderController from "./Order.controller";

@Module({
  controllers: [OrderController]
})
export class OrderModule {}

export default OrderModule;
