import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import CompanyController from "./Company.controller";
import CompanyService from "./Company.service";
import StoreModule from "./store/Store.module";

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [StoreModule],
  imports: [StoreModule]
})
export class CompanyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}

export default CompanyModule;
