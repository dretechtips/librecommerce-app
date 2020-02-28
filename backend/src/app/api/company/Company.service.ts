import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import { CompanyDOT } from "./Company.interface";
import Company from "./Company.model";

@Injectable()
export class CompanyService extends Service<typeof Company> {
  constructor() {
    super(Company);
  }
  public getSelf(): Promise<Company> {}
  public updateSelf(dot: CompanyDOT): Promise<void> {}
  public async disable(id: string): Promise<void> {
    const company = await this.get(id);
    company.active = false;
    await company.save();
  }
}

export default CompanyService;
