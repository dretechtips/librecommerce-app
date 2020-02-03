import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from "@nestjs/common";
import CartController from "src/controller/Cart.controller";
import CartService from "src/service/Cart.service";
import { ValidateCartIDMiddleware } from "src/middleware/Cart.middleware";

@Module({
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateCartIDMiddleware)
      .forRoutes({ path: "add", method: RequestMethod.POST });
  }
}

export default CartModule;
