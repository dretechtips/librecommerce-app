import { Injectable } from "@nestjs/common";
import Account from "src/app/api/account/Account.model";
import { CardDOT } from "src/app/api/billing/payments/card/Card.interface";
import CostSchema from "src/app/api/billing/transaction/cost/Cost.schema";
import Company from "src/app/api/company/Company.model";
import { PackageDOT } from "src/app/api/sale/shipping/package/Package.interface";
import {
  ShippingDOT,
  ShippingProvider,
  ShippingProviderService
} from "src/app/api/sale/shipping/Shipping.interface";
import Continent from "src/app/common/enum/continent/Continent";
import State from "src/app/common/enum/continent/country/US/State";
import AddressSchema from "src/app/common/model/schema/Address.schema";
import Service from "src/app/common/service/Service.factory";
import { CONTINENT, IS_SANDBOX } from "src/config/env";
import SandboxConfig from "src/config/vendor/ups/Sandbox";
import USConfig from "src/config/vendor/ups/US";
import {
  AddressValidation,
  Default,
  Party,
  Rating,
  Service as ShipmentService,
  ServiceCode,
  ShipmentRate,
  Tracking,
  VoidShipment
} from "ups_node";
import { UPSConfig } from "./UPS.interface";
import UPS from "./UPS.model";

@Injectable()
export class UPSService extends Service<typeof UPS>
  implements ShippingProviderService {
  private licenseID: string;
  private userID: string;
  private password: string;
  private readonly isSandbox: boolean = IS_SANDBOX;
  private readonly continent: Continent = CONTINENT;
  constructor() {
    super(UPS);
    this.setCredientals();
  }
  private setCredientals(): void {
    if (this.isSandbox) {
      this.licenseID = SandboxConfig.licenseID;
      this.userID = SandboxConfig.userID;
      this.password = SandboxConfig.password;
      return;
    }
    switch (this.continent) {
      case Continent.NORTH_AMERICA:
        this.setConfig(USConfig);
        break;
      default:
        throw new Error("This region is not supported.");
    }
  }
  private setConfig(config: UPSConfig) {
    this.licenseID = config.licenseID;
    this.userID = config.userID;
    this.password = config.password;
  }
  private useAPI<T extends Default>(Class: {
    new (licneseID: string, userID: string, passwordID: string): T;
  }): T {
    const instance = new Class(this.licenseID, this.userID, this.password);
    instance.setJsonResponse(true);
    instance.useSandbox(this.isSandbox);
    return instance;
  }
  private validateShippingDOT(shipping: ShippingDOT) {
    if (shipping.provider !== ShippingProvider.UPS)
      throw new Error("Invalid Shipping DOT");
  }
  public async isAvailable(): Promise<boolean> {
    return false;
  }
  public async getCosts(packages: PackageDOT[]): Promise<CostSchema[]> {
    return [];
  }
  public async cancel(shippingID: string): Promise<void> {
    const shipping = (await this.findAllByProp("shippingID", shippingID))[0];
    if (!shipping) throw new Error("Unable to find the Shipping ID.");
    const voided = this.useAPI(VoidShipment);
    voided.makeRequest(
      {
        tracking: shipping.tracking
      },
      console.log
    );
  }
  public async create(
    days: number,
    packages: PackageDOT[],
    shipFrom: Account | Company,
    shipTo: Account | Company,
    card: CardDOT
  ): Promise<ShippingDOT> {
    const service = await this.rate(days, packages, shipFrom, shipTo, card);
  }
  private buildShipmentRate(
    shipFrom: Account | Company,
    shipTo: Account | Company,
    packages: PackageDOT[]
  ): ShipmentRate {
    const SFContact = shipFrom.contact;
    const STContact = shipTo.contact;
    return {
      description: "Shipment",
      name: SFContact.firstName + " " + SFContact.lastName,
      shipper: {
        address: {
          addressLine: SFContact.address.street,
          city: SFContact.address.city,
          StateProvinceCode: "TODO",
          PostalCode: "TODO",
          countryCode: "US"
        }
      },
      shipFrom: this.buildParty(shipFrom),
      shipTo: this.buildParty(shipTo),
      service: {},
      payment: {},
      package: packages.map(),
      schedule: {}
    };
  }
  private buildParty(party: Account | Company): Party {
    const contact = party.contact;
    return {
      companyName: party instanceof Company ? party.name : "N/A",
      attentionName: contact.firstName + " " + contact.lastName,
      phoneNumber: contact.phone,
      addressLine: contact.address.street,
      city: contact.address.city,
      stateProvinceCode: "TODO",
      postalCode: "TODO",
      countryCode: "US"
    };
  }
  public async rate(
    days: number,
    packages: PackageDOT[],
    shipFrom: Account | Company,
    shipTo: Account | Company,
    card: CardDOT
  ): Promise<ShipmentService> {
    const rating = this.useAPI(Rating);
    rating.makeRequest(
      {
        customerContext: "",
        pickUpType: {
          code: "01",
          description: "Standard Pickup"
        },
        shipment: this.buildShipment(shipFrom, shipTo)
      },
      console.log
    );
    return {
      code: ServiceCode.EXPRESS
    };
  }
  public async track(shippingID: string): Promise<AddressSchema> {
    const shipping = (await this.findAllByProp("shippingID", shippingID))[0];
    if (!shipping) throw new Error("Unable to find the Shipping ID.");
    const tracking = this.useAPI(Tracking);
    tracking.makeRequest(
      {
        customerContext: "",
        trackingNumber: shipping.tracking
      },
      console.log
    );
    return new AddressSchema("1234 Test Street", "Dallas", State.TEXAS);
  }
  public async return(
    shippingDOT: ShippingDOT,
    shipFromDOT: Account | Company,
    card: CardDOT
  ): Promise<ShippingDOT> {
    this.validateShippingDOT(shippingDOT);
    return shippingDOT;
  }
  public async addressValidation(address: AddressSchema): Promise<boolean> {
    const validation = this.useAPI(AddressValidation);
    validation.makeRequest(
      {
        customerContext: "",
        city: address.city,
        stateProvinceCode: address.state
      },
      console.log
    );
    return false;
  }
}

export default UPSService;
