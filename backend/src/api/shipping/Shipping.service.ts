import { Injectable, Scope } from "@nestjs/common";
import { ShippingDOT } from "./Shipping.interface";
import { Form } from "src/interface/Form.interface";
import ServiceFactory from "src/util/Service.factory";
import Shipping from "./Shipping.model";

@Injectable()
export class ShippingService extends ServiceFactory<ShippingDOT>(Shipping) {}

export default ShippingService;
