import { Module } from "@nestjs/common";
import FedexService from "./Fedex.service";

@Module({
  controllers: [],
  providers: [FedexService]
})
export class FedexModule {}

export default FedexModule;
