import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import UserController from "./User.controller";
import { CreateAccountMiddleware } from "../Account.middleware";

@Module({
  controllers: [UserController],
  providers: []
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    this.attachAccountCreate(consumer);
  }
  private attachAccountCreate(consumer: MiddlewareConsumer) {
    consumer.apply(CreateAccountMiddleware).forRoutes("create");
  }
}

export default UserModule;
