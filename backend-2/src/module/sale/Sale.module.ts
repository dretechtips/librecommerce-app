import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import SaleController from "src/controller/Sale.controller";

@Module({
  controllers: [SaleController]
})
class SaleModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
