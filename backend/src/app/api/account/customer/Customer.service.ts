import { Injectable, Scope } from "@nestjs/common";
import { CustomerDOT } from "./Customer.interface";
import ServiceFactory from "src/app/common/service/Service.factory";
import Customer from "./Customer.model";

@Injectable()
export class CustomerService extends ServiceFactory(Customer) {}

export default CustomerService;
