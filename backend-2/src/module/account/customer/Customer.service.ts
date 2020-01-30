import { Injectable, Scope } from "@nestjs/common";
import { CustomerDOT } from "./Customer.interface";
import ServiceFactory from "src/util/Service.factory";
import Customer from "./Customer.model";

@Injectable()
export class CustomerService extends ServiceFactory<CustomerDOT>(Customer) {}

export default CustomerService;
