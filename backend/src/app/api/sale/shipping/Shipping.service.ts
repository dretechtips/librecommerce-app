import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import Service from "src/app/common/service/Service.factory";
import FedexService from "src/app/vendor/fedex/Fedex.service";
import UPSService from "src/app/vendor/ups/UPS.service";
import USPSService from "src/app/vendor/usps/USPS.service";
import Customer from "../../account/type/customer/Customer.model";
import CustomerService from "../../account/type/customer/Customer.service";
import CompanyService from "../../company/Company.service";
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
  private customer: CustomerService;
  private company: CompanyService;
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
    this.provider.set(ShippingProvider.FEDEX, this.moduleRef.get(FedexService, {strict: false}));
    this.provider.set(ShippingProvider.UPS, this.moduleRef.get(UPSService, {strict: false}));
    this.provider.set(ShippingProvider.USPS, this.moduleRef.get(USPSService, {strict: false}));
    this.customer = this.moduleRef.get(CustomerService, {strict: false});
    this.company = this.moduleRef.get(CompanyService, {strict: false});
  }
  public async create(
    provider: ShippingProvider,
    days: number,
    products: Variation[],
    customer: Customer
  ): Promise<Shipping> {
    const packages = await this._package.create(products);
    const shippingDOT: ShippingDOT = {
      provider: provider,
      days: days,
      cancelled: false,
      packageIDs: packages.map(cur => cur._id),
      costs: []
    };
    await this.add(shippingDOT);
    const shipping = new Shipping(shippingDOT);
    switch(provider) {
      case ShippingProvider.UPS:
        this.action(provider, service => service.create(shipping, customer))
        break;
      default:
        throw new Error("Only UPS shipping provider is supported for now.");
    }
    return shipping;
  }
  
  public async cancel(shippingID: string): Promise<void> {
    const shipping = await this.get(shippingID);
    const provider = shipping.provider;
    switch(provider) {
      case ShippingProvider.UPS:
        this.action(provider, service => service.cancel(shipping));
        break;
      default: 
        throw new Error("Only UPS shipping provider is supported for now.");
    }
    shipping.cancelled = true;
    await shipping.save();
  }

  private async action(provider: ShippingProvider, fn: (service: ShippingProviderService) => Promise<void>): Promise<void> {
    const name = ShippingProvider[provider];
    const service = this.provider.get(provider);
    if(!service)
      throw new Error(name + " Service is missing from Shipping Service");
    if(!(await service.isAvailable()))
      throw new Error(name + " Servers are not avaliable.");
    await fn(service);
  }
  
  public async findCheapestProvider(
    items: Variation[],
    days: number
  ): Promise<ShippingProvider> {
    if (items.length === 0) return ShippingProvider.NONE;
    const packages = await this._package.getOptimal(items);
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
