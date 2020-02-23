import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import Service from "src/app/common/service/Service.factory";
import PaymentsService from "../../../billing/payments/Payments.service";
import { TypeDependentService } from "../Type.interface";
import { CustomerDOT } from "./Customer.interface";
import Customer from "./Customer.model";

@Injectable()
export class CustomerService extends Service<typeof Customer>
  implements OnModuleInit, TypeDependentService {
  public payment: PaymentsService;
  constructor(private readonly moduleRef: ModuleRef) {
    super(Customer);
  }
  public onModuleInit(): void {
    this.payment = this.moduleRef.get(PaymentsService, { strict: false });
  }
  public isAccountType(accountID: string): Promise<boolean> {
    return this.findAllByProp("accountID", accountID)
      .then(cur => true)
      .catch(cur => false);
  }
  public async new(accountID: string): Promise<Customer> {
    const paymentID: string = await this.payment
      .add({
        bankIDs: [],
        ccIDs: []
      })
      .then(cur => cur.id);
    const customerDOT: CustomerDOT = {
      paymentID: paymentID,
      accountID: accountID,
      saleIDs: [],
      lastOrderDate: new Date(0),
      subscriptionIDs: []
    };
    const customer = new Customer(customerDOT);
    await customer.validate();
    return customer;
  }
  // TODO
  public forAllWithSubscription(
    fn: (customer: Customer, index: number) => void
  ): void {
    this.findAllByProp("subscriptionIDs", []);
  }
  public async unsubscribe(
    customerID: string,
    subscriptionID: string
  ): Promise<void> {
    const customer: Customer = await this.get(customerID);
    customer.subscriptionIDs = customer.subscriptionIDs.filter(
      cur => cur !== subscriptionID
    );
    await customer.save();
  }
}

export default CustomerService;
