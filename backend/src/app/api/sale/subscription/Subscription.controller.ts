import { Body, Controller, Get, Param, Req } from "@nestjs/common";
import { Request } from "express";
import { SubscriptionDOT } from "./Subscription.interface";
import { ValidateSubscriptionIDPipe } from "./Subscription.pipe";
import SubscriptionService from "./Subscription.service";

export const prefix = "subscription";

@Controller("subscription")
export class SubscriptionController {
  constructor(private readonly subscription: SubscriptionService) {}
  @Get("fetch/:id")
  public async fetch(@Param("id", ValidateSubscriptionIDPipe) id: string) {
    return (await this.subscription.get(id)).toJSON();
  }
  @Get("create")
  public async create(
    @Req() req: Request,
    @Body(prefix) subscription: SubscriptionDOT
  ) {
    return (await this.subscription.create(req, subscription))._id;
  }
}

export default SubscriptionController;
