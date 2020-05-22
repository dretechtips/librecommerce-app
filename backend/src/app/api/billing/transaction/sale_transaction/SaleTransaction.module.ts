import { Module } from "@nestjs/common";
import { SaleTransactionService } from "./SaleTransaction.service";

@Module({
  controllers:[],
  providers: [SaleTransactionService]
})
export class SaleTransactionModule {

}

export default SaleTransactionModule;