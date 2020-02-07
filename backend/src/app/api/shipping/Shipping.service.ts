import { Injectable, Scope } from "@nestjs/common";
import { ShippingDOT } from "./Shikspping.interface";
import ServiceFactory from "src/app/common/service/Service.factory";
import Shipping from "./Shipping.model";

@Injectable()
export class ShippingService extends ServiceFactory(Shipping) {}

export default ShippingService;
