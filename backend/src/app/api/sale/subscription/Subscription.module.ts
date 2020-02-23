import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import SubscriptionController from "./Subscription.controller";
import SubscriptionService from "./Subscription.service";
@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService]
})
export class SubscriptionModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}

export default SubscriptionModule;
