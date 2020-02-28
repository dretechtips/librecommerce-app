import { Module } from "@nestjs/common";
import CompanyController from "./Company.controller";
import CompanyService from "./Company.service";

@Module({
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}

export default CompanyModule;
