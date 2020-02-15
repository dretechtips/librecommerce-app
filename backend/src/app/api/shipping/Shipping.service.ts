import { Injectable, Scope, OnModuleInit } from "@nestjs/common";
import {
  ShippingDOT,
  ShippingProviderService,
  ShippingProvider
} from "./Shipping.interface";
import Service from "src/app/common/service/Service.factory";
import Shipping from "./Shipping.model";
import { ModuleRef } from "@nestjs/core";
import FedexService from "src/app/vendor/fedex/Fedex.service";
import USPSService from "src/app/vendor/usps/USPS.service";
import UPSService from "src/app/vendor/ups/UPS.service";

@Injectable()
export class ShippingService extends Service<typeof Shipping>
  implements OnModuleInit {
  private provider: Map<ShippingProvider, ShippingProviderService>;
  constructor(private readonly moduleRef: ModuleRef) {
    super(Shipping);
  }
  public onModuleInit() {
    this.provider.set(ShippingProvider.FEDEX, this.moduleRef.get(FedexService));
    this.provider.set(ShippingProvider.USPS, this.moduleRef.get(USPSService));
    this.provider.set(ShippingProvider.UPS, this.moduleRef.get(UPSService));
  }
  public async findCheapestProvider(shipping: Shipping): Service {
    let providers = Array.from(this.provider.entries());
    const availiblity = await Promise.all(
      providers.map(async cur => cur[1].isAvailable().catch(cur => false))
    );
    providers = providers.filter((cur, index) => availiblity[index]);
    Promise.all(providers.map(async cur => cur[1].getCosts(shipping)));
  }
}

export default ShippingService;
