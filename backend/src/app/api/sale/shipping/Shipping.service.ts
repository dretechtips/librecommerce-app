import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import Account from "src/app/api/account/Account.model";
import AddressSchema from "src/app/common/model/schema/Address.schema";
import Service from "src/app/common/service/Service.factory";
import UPSService from "src/app/vendor/ups/UPS.service";
import { AccountDependentDOT } from "../../account/Account.interface";
import Store from "../../account/store/Store.model";
import { AlertType } from "../../alert/Alert.interface";
import AlertService from "../../alert/Alert.service";
import CostSchema from "../../billing/transaction/cost/Cost.schema";
import Company from "../../company/Company.model";
import { VariationDOT } from "../product/variation/Variation.interface";
import Variation from "../product/variation/Variation.model.txt";
import BoxService from "./box/Box.service";
import PackageService from "./package/Package.service";
import PalletService from "./pallet/Pallet.service";
import {
  ShippingDOT,
  ShippingProvider,
  ShippingProviderService
} from "./Shipping.interface";
import Shipping from "./Shipping.model";

/**
 * FUTURE: UPDATE PALLET
 */
@Injectable()
export class ShippingService extends Service<typeof Shipping>
  implements OnModuleInit {
  private static MIN_DAY = 1;
  private static MAX_DAY = 4;
  private provider: Map<ShippingProvider, ShippingProviderService>;
  private options: Map<ShippingProvider, ShippingProviderService>;
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly alert: AlertService,
    private readonly box: BoxService,
    private readonly _package: PackageService,
    private readonly pallet: PalletService
  ) {
    super(Shipping);
    this.provider = new Map();
    this.options = new Map();
  }
  public onModuleInit() {
    this.options.set(
      ShippingProvider.UPS,
      this.moduleRef.get(UPSService, { strict: false })
    );
    // this.provider.set(
    //   ShippingProvider.USPS,
    //   this.moduleRef.get(USPSService, { strict: false })
    // );
    // this.provider.set(
    //   ShippingProvider.FEDEX,
    //   this.moduleRef.get(FedexService, { strict: false })
    // );
  }
  public async ship(
    provider: ShippingProvider,
    days: number,
    products: Variation[],
    shipFrom: Store,
    shipToAccount: AccountDependentDOT
  ): Promise<Shipping> {
    const shipTo = shipToAccount.account;
    const packages = await this._package.create(products);
    const shippingDOT: ShippingDOT = {
      provider: provider,
      days: days,
      cancelled: false,
      packageIDs: packages.map(cur => cur._id),
      costs: [],
      shipFrom: shipFrom.contact.address,
      shipTo: shipTo.contact.address
    };
    await this.add(shippingDOT);
    const shipping = new Shipping(shippingDOT);
    switch (provider) {
      case ShippingProvider.UPS:
        this.action(provider, service =>
          service.ship(days, packages, shipFrom, shipTo)
        );
        break;
      default:
        throw new Error("Only UPS shipping provider is supported for now.");
    }
    return shipping;
  }

  public async cancel(shippingID: string): Promise<void> {
    const shipping = await this.get(shippingID);
    const provider = shipping.provider;
    switch (provider) {
      case ShippingProvider.UPS:
        this.action(provider, service => service.cancel(shippingID));
        break;
      default:
        throw new Error("Only UPS shipping provider is supported for now.");
    }
    shipping.cancelled = true;
    await shipping.save();
  }

  public async return(
    shippingID: string,
    shipFrom: AccountDependentDOT,
    shipTo: Store
  ): Promise<Shipping> {
    const prev = await this.get(shippingID);
    const provider = this.getBestProviderWithPackages(prev.packageIDs);
    const packages = await this._package.getAll(prev.packageIDs);
    const shipping = await new Promise<Shipping>((res, rej) => {
      this.action(prev.provider, async service =>
        res(new Shipping(service.return(packages, shipFrom, shipTo)))
      );
    });
    await shipping.save();
    return shipping;
  }

  public async track(shippingID: string): Promise<AddressSchema> {
    return new Promise(async (res, rej) => {
      const shipping = await this.get(shippingID);
      this.action(shipping.provider, async service => {
        res(service.track(shippingID));
      });
    });
  }

  public async getCosts(
    provider: ShippingProvider,
    products: Variation[],
    days: number,
    shipFrom: Store | Company | Account,
    shipTo: Store | Company | Account
  ): Promise<CostSchema[]> {
    return new Promise(async (res, rej) => {
      const packages = await this._package.create(products);
      this.action(provider, async service =>
        res(service.getCosts(days, packages, shipFrom, shipTo))
      );
    });
  }

  public async isAvailable(): Promise<void> {
    this.provider.clear();
    const keys: ShippingProvider[] = Object.keys(ShippingProvider).map(
      key => ShippingProvider[key]
    );
    const avaliability = await Promise.all<boolean>(
      keys.map(key => {
        return new Promise((res, rej) => {
          const option = this.options.get(key);
          if (!option) return false;
          this.action(key, async service => res(service.isAvailable()));
        });
      })
    );
    for (let i = 0; i < keys.length; i++) {
      const key: ShippingProvider = keys[i];
      const isAvailable: boolean = avaliability[i];
      const service = this.provider.get(key);
      if (!service) {
        if (isAvailable && this.options.has(key)) {
          this.provider.set(
            key,
            this.options.get(key) as ShippingProviderService
          );
          this.alert.broadcast(
            {
              msg:
                "Shipping: " +
                ShippingProvider[key] +
                " service is now avaliable for shipping. ",
              type: AlertType.SERVER
            },
            // TODO
            []
          );
        }
      } else {
        if (!isAvailable) {
          this.provider.delete(key);
          this.alert.broadcast(
            {
              msg:
                "Shipping: " +
                ShippingProvider[key] +
                " service is not avaliable for shipping. ",
              type: AlertType.SERVER
            },
            // TODO
            []
          );
        }
      }
    }
  }

  private async action(
    provider: ShippingProvider,
    fn: (service: ShippingProviderService) => Promise<void>
  ): Promise<void> {
    const name = ShippingProvider[provider];
    const service = this.provider.get(provider);
    if (!service)
      throw new Error(name + " Service is missing from Shipping Service");
    if (!(await service.isAvailable()))
      throw new Error(name + " Servers are not avaliable.");
    await fn(service);
  }

  /**
   * @todo
   */
  public async getBestProvider(
    products: VariationDOT[]
  ): Promise<ShippingProvider> {
    return ShippingProvider.UPS;
  }

  public async getBestProviderWithPackages(packageIDs: string[]) {
    return this.getBestProvider([]);
  }

  // public async findCheapestProvider(
  //   items: Variation[],
  //   days: number
  // ): Promise<ShippingProvider> {
  //   if (items.length === 0) return ShippingProvider.NONE;
  //   const packages = await this._package.getOptimal(items);
  //   const shippingDOT: ShippingDOT = {
  //     cancelled: false,
  //     days: days,
  //     packageIDs: packages.map(cur => cur.id),
  //     provider: ShippingProvider.NONE,
  //     costs: /** */
  //   };
  //   const cheapest = (
  //     await Promise.all(
  //       Array.from(this.provider.entries()).map(
  //         async cur =>
  //           [cur[0], await cur[1].getCosts(new Shipping(shippingDOT))] as [
  //             ShippingProvider,
  //             SubCost[]
  //           ]
  //       )
  //     )
  //   ).reduce((cheapest, cur) => {
  //     if (
  //       cur[1].reduce((total, cur) => cur.cost + total, 0) <
  //       cheapest[1].reduce((total, cur) => cur.cost + total, 0)
  //     )
  //       return cur;
  //     return cheapest;
  //   });
  //   return cheapest[0];
  // }
}

export default ShippingService;
