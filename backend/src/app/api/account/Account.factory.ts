import { MiddlewareConsumer, NestModule } from "@nestjs/common";
import { CreateAccountMiddleware } from "./Account.middleware";

export abstract class AccountDependentModule implements NestModule {
  private create = "create";
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateAccountMiddleware).forRoutes(this.create);
  }
  /**
   * @default prefix "create"
   * @param prefix Path Prefix
   */
  protected changeDefaultPrefix(prefix: string) {
    this.create = prefix;
  }
}
