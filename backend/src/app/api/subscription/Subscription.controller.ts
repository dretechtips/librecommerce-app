import { Controller, Get, Param } from "@nestjs/common";
import { ValidateSubscriptionIDPipe } from "./Subscription.pipe";
import SubscriptionService from "./Subscription.service";

@Controller("subscription")
export class SubscriptionController {
  constructor(private readonly subscription: SubscriptionService) {}
  @Get("fetch/:id")
  public async fetch(@Param("id", ValidateSubscriptionIDPipe) id: string) {
    return (await this.subscription.get(id)).toJSON();
  }
  public async createByClient() {}
  public async createByAdmin() {}
}

export default SubscriptionController;
