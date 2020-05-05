import { Controller } from "@nestjs/common";
import { RestrictAccess } from "src/app/api/account/util/login/Login.decorator";
import { AccountType } from "../Type.interface";
import { CompanyDOT } from "./Company.interface";
import CompanyService from "./Company.service";

export const prefix = "company";

@Controller(prefix)
@RestrictAccess(AccountType.USER, AccountType.COMPANY)
class CompanyController {
  constructor(private readonly company: CompanyService) {}
  public fetch(id: string) {}

  public update(id: string, dot: CompanyDOT) {}

  public disable(id: string) {
    this.company.disable(id);
  }
}

export default CompanyController;
