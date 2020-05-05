import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AccountType } from "../Account.interface";
import { ValidateAccountID } from "../Account.pipe";
import { RestrictAccess } from "../util/login/Login.decorator";
import { CustomerDOT } from "./Customer.interface";
import { ValidateCustomerIDPipe, ValidateCustomerPipe } from "./Customer.pipe";
import CustomerService from "./Customer.service";

export const prefix = "customer";

@Controller(prefix)
export class CustomerController {
  constructor(private readonly customer: CustomerService) {}
  @Post("create/:accountID")
  @RestrictAccess(AccountType.ADMIN, AccountType.CUSTOMER, AccountType.NONE)
  public async create(
    @Param("accountID", ValidateAccountID) accountID: string
  ) {
    const customer = await this.customer.new(accountID);
    return customer._id;
  }
  @Get("find/:customerID")
  public async find(
    @Param("customerID", ValidateCustomerIDPipe) customerID: string
  ) {
    return (await this.customer.get(customerID)).toJSON();
  }
  @Get("update/:customerID")
  public async update(
    @Param("customerID", ValidateCustomerIDPipe) customerID: string,
    @Body(prefix, ValidateCustomerPipe) customer: CustomerDOT
  ): Promise<void> {
    await this.customer.update(customerID, customer);
  }
}

export default CustomerController;
