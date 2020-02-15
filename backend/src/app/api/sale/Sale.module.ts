import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import SaleController from "./Sale.controller";
import SaleService from "./Sale.service";
import SaleTask from "./Sale.task";

@Module({
  controllers: [SaleController],
  providers: [SaleService, SaleTask],
  exports: [SaleService]
})
export class SaleModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}

export default SaleModule;
