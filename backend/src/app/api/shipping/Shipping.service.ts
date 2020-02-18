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
import DimensionSchema from "src/app/common/model/schema/Dimension.schema";
import BoxService from "./packages/package/box/Box.service";
import Box from "./packages/package/box/Box.model";
import WeightSchema from "src/app/common/model/schema/Weight.schema";
import { Packable } from "./packer/Packer.interface";

@Injectable()
export class ShippingService extends Service<typeof Shipping>
  implements OnModuleInit {
  private provider: Map<ShippingProvider, ShippingProviderService>;
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly box: BoxService
  ) {
    super(Shipping);
  }
  public onModuleInit() {
    this.provider.set(ShippingProvider.FEDEX, this.moduleRef.get(FedexService));
    this.provider.set(ShippingProvider.USPS, this.moduleRef.get(USPSService));
    this.provider.set(ShippingProvider.UPS, this.moduleRef.get(UPSService));
  }
  public async findCheapestProvider(items: Packable[], days: number) {
    if (items.length === 0) throw new Error("Array has no values");
    let boxes = await this.box.findSmallestBoxes(items);
    boxes = await this.box.nextBoxesSize(boxes);
    boxes.map(cur => {
      const shipping: ShippingDOT = {
        cancelled: false,
        provider: ShippingProvider.NONE,
        days: days,
        boxID: cur._id,
        weight: 
      }
    })
    Array.from(this.provider.entries()).map(cur => {
      const shippingDOT: ShippingDOT = {};
      return [cur[0], cur[1].getCosts(new Shipping())];
    });
  }
}

export default ShippingService;
