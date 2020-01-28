import { AccountLoginGuard } from "./Account.guard";
import { prefix } from "../controller/Customer.controller";
import Customer from "src/model/Customer";

export class CustomerLoginGuard extends AccountLoginGuard {
  constructor() {
    super(prefix, Customer);
  }
}
