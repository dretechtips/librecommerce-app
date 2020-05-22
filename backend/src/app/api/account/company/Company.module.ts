import { Module } from "@nestjs/common";
import ExternalCompanyModule from "./external_company/ExternalCompany.module";
import InternalCompanyModule from "./internal_company/InternalCompany.module";
import CompanyService from "./Company.service";

@Module({
  controllers: [],
  providers: [CompanyService],
  imports: [ExternalCompanyModule, InternalCompanyModule],
  exports: [ExternalCompanyModule, InternalCompanyModule],
})
export class CompanyModule {
  
}

export default CompanyModule;