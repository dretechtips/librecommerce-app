import { Injectable } from "@nestjs/common";
import { ShippingPartner } from "../Vendor.interface";

@Injectable()
export class FedexService implements ShippingPartner {}

export default FedexService;
