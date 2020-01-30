import { Controller, Post, Body, Res, Get } from "@nestjs/common";
import { Response } from "express";
import { prefix as accountPrefix } from "../Account.controller";
import { IDOnly } from "src/util/Types";
import Customer from "./Customer.model";
import { CustomerIDValidationPipe } from "./Customer.pipe";
import Order from "src/module/order/Order.model";

export const prefix = "customer";

@Controller("customer")
export class CustomerController {
  @Post("create")
  public create(@Res() res: Response, @Body(prefix) customer: any) {
    const accountID = res.locals[accountPrefix].id;
    customer = {...customer, accountID};
    const doc = new Customer(customer);
    doc.validate();
    return doc.id();
  }
  @Get("orders")
  public async orders(@Body(prefix, CustomerIDValidationPipe) customer: IDOnly) {
    const { id } = customer;
    const doc = await Customer.getSelfByID(id);
    const orders: Order[] = await (doc as Customer).getOrders();
    return orders.map(order => order.data());
  }
}

export default CustomerController;