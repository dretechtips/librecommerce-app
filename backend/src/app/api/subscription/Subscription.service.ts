import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Subscription from "./Subscription.model";

@Injectable()
export class SubscriptionService extends Service<Subscription> {
  constructor() {
    super(Subscription);
  }
}

export default SubscriptionService;
