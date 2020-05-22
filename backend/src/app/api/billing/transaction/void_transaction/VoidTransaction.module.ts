import { Module } from "@nestjs/common";
import VoidTransactionService from "./VoidTransaction.service";

@Module({
  controllers: [],
  providers: [VoidTransactionService]
})
export class VoidTransactionModule {

}

export default VoidTransactionModule;