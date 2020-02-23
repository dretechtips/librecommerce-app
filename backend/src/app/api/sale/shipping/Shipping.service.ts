import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import Service from "src/app/common/service/Service.factory";
import FedexService from "src/app/vendor/fedex/Fedex.service";
import UPSService from "src/app/vendor/ups/UPS.service";
import USPSService from "src/app/vendor/usps/USPS.service";
import { SubCost } from "../../billing/transaction/Transaction.interface";
import Variation from "../product/variation/Variation.model";
import BoxService from "./box/Box.service";
import PackageService from "./package/Package.service";
import PalletService from "./pallet/Pallet.service";
import { ShippingDOT, ShippingProvider, ShippingProviderService } from "./Shipping.interface";
import Shipping from "./Shipping.model";

/**
 * FUTURE: UPDATE PALLET
 */
@Injectable()
export class ShippingService extends Service<typeof Shipping>
  implements OnModuleInit {
  // US ONLY
  private static MIN_DAY = 1;
  private static MAX_DAY = 4;
  private provider: Map<ShippingProvider, ShippingProviderService>;
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly box: BoxService,
    private readonly _package: PackageService,
    private readonly pallet: PalletService
  ) {
    super(Shipping);
    this.provider = new Map();
  }
  public onModuleInit() {
    this.provider.set(ShippingProvider.FEDEX, this.moduleRef.get(FedexService));
    this.provider.set(ShippingProvider.UPS, this.moduleRef.get(UPSService));
    this.provider.set(ShippingProvider.USPS, this.moduleRef.get(USPSService));
  }
  public async create(
    shippingNoPackage: Omit<ShippingDOT, "packageIDs" | "costs">,
    products: Variation[]
  ): Promise<Shipping> {
    const packages = await this._package.create(products);
    const shippingDOT: ShippingDOT = {
      ...shippingNoPackage,
      packageIDs: packages.map(cur => cur._id),
      costs: /** */
    };
    await this.add(shippingDOT);
    return new Shipping(shippingDOT);
  }
  public async add(dot: any) {
    if (!(await this.validateDOT(dot))) throw new Error("Invalid DOT");
    const shippingDOT: ShippingDOT = dot;
    switch (shippingDOT.provider) {
      case ShippingProvider.NONE:
        throw new Error("Cannot add shipping provider of NONE");
      case ShippingProvider.FEDEX:
        // Create Fedex
        break;
      case ShippingProvider.USPS:
        // Create USPS
        break;
      case ShippingProvider.UPS:
        // Create UPS
        break;
    }
    return super.add(dot);
  }
  public async cancel(shippingID: string) {
    // FIND PROVIDER
    // CANCEL FROM PROVIDER
    // CANCEL
  }
  public async findCheapestProvider(
    items: Variation[],
    days: number
  ): Promise<ShippingProvider> {
    if (items.length === 0) return ShippingProvider.NONE;
    const packages = await this._package.getOptimial(items);
    const shippingDOT: ShippingDOT = {
      cancelled: false,
      days: days,
      packageIDs: packages.map(cur => cur.id),
      provider: ShippingProvider.NONE,
      costs: /** */
    };
    const cheapest = (
      await Promise.all(
        Array.from(this.provider.entries()).map(
          async cur =>
            [cur[0], await cur[1].getCosts(new Shipping(shippingDOT))] as [
              ShippingProvider,
              SubCost[]
            ]
        )
      )
    ).reduce((cheapest, cur) => {
      if (
        cur[1].reduce((total, cur) => cur.cost + total, 0) <
        cheapest[1].reduce((total, cur) => cur.cost + total, 0)
      )
        return cur;
      return cheapest;
    });
    return cheapest[0];
  }
  public async createLowestCost(items: Variation[]) {
    const provider = await this.findCheapestProvider(
      items,
      ShippingService.MAX_DAY
    );
    return this.create(
      { provider: provider, cancelled: false, days: ShippingService.MAX_DAY },
      items
    );
  }
}

export default ShippingService;
