import { Injectable, Scope, OnModuleInit } from "@nestjs/common";
import { CustomerDOT } from "./Customer.interface";
import Service from "src/app/common/service/Service.factory";
import Customer from "./Customer.model";
import PaymentsService from "../../billing/payments/Payments.service";
import { ModuleRef } from "@nestjs/core";
import { AccountTypeService } from "../Account.interface";

@Injectable()
export class CustomerService extends Service<typeof Customer>
  implements OnModuleInit, AccountTypeService {
  public payment: PaymentsService;
  constructor(private readonly moduleRef: ModuleRef) {
    super(Customer);
  }
  public onModuleInit(): void {
    this.payment = this.moduleRef.get(PaymentsService);
  }
  public isAccountType(accountID: string): Promise<boolean> {
    return this.findAllByProp("accountID", accountID)
      .then(cur => true)
      .catch(cur => false);
  }
  public async new(accountID: string): Promise<Customer> {
    const paymentID: string = (
      await this.payment.add({
        bankIDs: [],
        ccIDs: []
      })
    ).id();
    const customerDOT: CustomerDOT = {
      paymentsID: paymentID,
      accountID: accountID,
      orderIDs: [],
      lastOrderDate: ""
    };
    const customer = new Customer(customerDOT);
    await customer.validate();
    return customer;
  }
}

export default CustomerService;
