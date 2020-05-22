import { Module } from "@nestjs/common";
import ExternalCompanyService from "./ExternalCompany.service";

@Module({
  controllers: [],
  providers: [ExternalCompanyService]
})
export class ExternalCompanyModule {

}

export default ExternalCompanyModule;