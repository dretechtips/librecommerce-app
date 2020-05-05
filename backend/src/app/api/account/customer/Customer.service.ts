import Service from "src/app/common/service/Service.factory";
import Customer from "./Customer.model";

class CustomerService extends Service<typeof Customer> {
  /**
   * @deprecated Use subscription service unsubscribe since this isn't generic
   * @param customerID 
   * @param subscriptionID 
   */
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
