import { Controller } from "@nestjs/common";
import CompanyService from "./Company.service";

export const prefix = "customer";

@Controller(prefix)
export class CustomerController {
  constructor(private readonly customer: CompanyService) {}

}

export default CustomerController;