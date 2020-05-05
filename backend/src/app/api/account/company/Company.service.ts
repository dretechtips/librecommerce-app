import { Injectable, OnModuleInit } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import { AccountType } from "../Type.interface";
import Company from "./Company.model";

class CompanyService extends Service<typeof Company> {}

@Injectable()
export default class
  extends AccountServiceFactory(CompanyService, Company, AccountType.COMPANY)
  implements OnModuleInit {
  private self: Company;
}
