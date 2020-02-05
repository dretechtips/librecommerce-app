import { Injectable, Scope } from "@nestjs/common";
import { ShippingDOT } from "./Shipping.interface";
import ServiceFactory from "src/common/factory/Service.factory";
import Shipping from "./Shipping.model";

@Injectable()
export class ShippingService extends ServiceFactory(Shipping) {}

export default ShippingService;
