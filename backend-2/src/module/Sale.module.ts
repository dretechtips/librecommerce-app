import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";

@Module({
  controllers: []
})
class SaleModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
