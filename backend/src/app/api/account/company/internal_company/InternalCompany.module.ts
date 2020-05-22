import { Module } from "@nestjs/common";
import InternalCompanyService from "./InternalCompany.service";

@Module({
  controllers: [],
  providers: [InternalCompanyService]
})
export class InternalModule {

}

export default InternalModule;