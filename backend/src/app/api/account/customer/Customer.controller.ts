import { Controller, Post, Body, Res, Get, Param, Patch } from "@nestjs/common";
import { Response } from "express";
import { IDOnly } from "src/util/Types";
import Customer from "./Customer.model";
import { CustomerIDValidationPipe } from "./Customer.pipe";
import Order from "src/app/api/order/Order.model";
import { RestrictAccount } from "../Account.decorator";
import { ValidateAccountID } from "../Account.pipe";
import { CustomerDOT } from "./Customer.interface";
import CustomerService from "./Customer.service";

export const prefix = "customer";

@Controller("customer")
export class CustomerController {
  constructor(private readonly customer: CustomerService) {}
  @Post("create/:accountID")
  @RestrictAccount("customer", "none")
  public async create(
    @Param("accountID", ValidateAccountID) accountID: string
  ) {
    const customer = await this.customer.new(accountID);
    return customer.id();
  }
  @Get("orders")
  public async orders(
    @Body(prefix, CustomerIDValidationPipe) customer: IDOnly
  ) {
    const { id } = customer;
    const doc = await Customer.getSelfByID(id);
    const orders: Order[] | null = await (doc as Customer).getOrders();
    return !orders ? [] : orders.map(order => order.data());
  }
  @Get("find/:customerID")
  public async find(
    @Param("customerID", CustomerIDValidationPipe) customerID: string
  ) {
    return (await this.customer.get(customerID)).data();
  }
}

export default CustomerController;
