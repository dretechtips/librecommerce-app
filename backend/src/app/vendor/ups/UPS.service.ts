import { Injectable } from "@nestjs/common";
import CostSchema from "src/app/api/billing/cost/Cost.schema";
import Company from "src/app/api/company/Company.model";
import { PackageDOT } from "src/app/api/sale/shipping/package/Package.interface";
import {
  ShippingParty,
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
  Packages,
  Party,
  Rating,
  Service as ShipmentService,
  ServiceCode,
  ShipAccept,
  ShipConfirm,
  Shipment,
  TimeInTransit,
  Tracking,
  VoidShipment
} from "ups_node";
import { UPSConfig } from "./UPS.interface";
import UPS from "./UPS.model";

@Injectable()
export class UPSService extends Service<typeof UPS>
  implements ShippingProviderService {
  private accountID: string;
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
  public async isAvailable(): Promise<boolean> {
    try {
      const use = this.useAPI;
      const av = use(AddressValidation);
      const rating = use(Rating);
      const sAccept = use(ShipAccept);
      const sConfirm = use(ShipConfirm);
      const timeIT = use(TimeInTransit);
      const tracking = use(Tracking);
      const result = await Promise.all(
        [av, rating, sAccept, sConfirm, timeIT, tracking].map(cur => cur.test())
      );
      for (let i = 0; i < result.length; i++) {
        if (result[i] === false) return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  public async getCosts(
    packages: PackageDOT[],
    days: number
  ): Promise<CostSchema[]> {
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
  public async ship(
    days: number,
    packages: PackageDOT[],
    shipFrom: ShippingParty,
    shipTo: ShippingParty
  ): Promise<void> {
    const service = this.rateAsShip(days);
    this.useAPI(ShipConfirm).makeRequest(
      {
        validate: "TODO",
        shipment: this.buildShipment(shipFrom, shipTo, packages, service, false)
      },
      console.log
    );
    // ADD SHIP ACCEPT TO CREATE SHIPPING
  }
  public async return(
    packages: PackageDOT[],
    shipFrom: ShippingParty,
    shipTo: ShippingParty
  ): Promise<void> {
    const service = this.rateAsReturn();
    this.useAPI(ShipConfirm).makeRequest(
      {
        validate: "TODO",
        shipment: this.buildShipment(shipFrom, shipTo, packages, service, true)
      },
      console.log
    );
    // ADD SHIP ACCEPT
  }
  public rateAsShip(days: number): ShipmentService {
    return this.bestService(days);
  }
  public rateAsReturn() {
    return this.bestService(4);
  }
  public async track(shippingID: string): Promise<AddressSchema> {
    const shipping = (await this.findAllByProp("shippingID", shippingID))[0];
    if (!shipping) throw new Error("Unable to find the Shipping ID.");
    const tracking = this.useAPI(Tracking);
    tracking.makeRequest(
      {
        customerContext: "Tracking Existing UPS Shipping",
        trackingNumber: shipping.tracking
      },
      console.log
    );
    return new AddressSchema("1234 Test Street", "Dallas", State.TEXAS, 75056);
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
  private buildShipment(
    shipFrom: ShippingParty,
    shipTo: ShippingParty,
    packages: PackageDOT[],
    service: ShipmentService,
    isReturn: boolean
  ): Shipment {
    let shipper = isReturn ? shipTo : shipFrom;
    return {
      description: "Shipment Rating",
      shipper: {
        name: shipper.company
          ? shipper.company
          : shipper.contact.firstName + " " + shipper.contact.lastName,
        attentionName:
          shipper.contact.firstName + " " + shipper.contact.lastName,
        shipperNumber: this.accountID,
        phone: shipper.contact.phone,
        address: {
          address1: shipper.contact.address.street,
          city: shipper.contact.address.city,
          state: shipper.contact.address.state,
          zip: String(shipper.contact.address.zip),
          country: "US"
        }
      },
      shipFrom: this.buildParty(shipFrom),
      shipTo: this.buildParty(shipTo),
      service: service,
      paymentInformation: {
        accountNumber: this.accountID
      },
      package: this.buildPackages(packages)
    };
  }
  private buildParty(party: ShippingParty): Party {
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
  private buildPackages(_packages: PackageDOT[]): Packages {
    return _packages.map(cur => {
      return {
        code: "TODO",
        description: "TODO",
        weight: cur.totalWeight.value,
        insurance: {}
      };
    });
  }
  private bestService(days: number): ShipmentService {
    let code: ServiceCode;
    switch (days) {
      case 1:
        code = ServiceCode.NEXTDAY_AIR_SAVER;
        break;
      case 2:
        code = ServiceCode.SECONDDAY_AIR;
        break;
      case 3:
        code = ServiceCode.THREEDAY;
        break;
      case 4:
        code = ServiceCode.STANDARD;
        break;
      default:
        throw new Error(
          "No option can be generated for more than 4 days shipping for UPS."
        );
    }
    return {
      code: code
    };
  }
}

export default UPSService;
