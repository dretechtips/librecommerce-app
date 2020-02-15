import { Module } from "@nestjs/common";
import USPSService from "./USPS.service";

@Module({
  controllers: [],
  providers: [USPSService]
})
export class USPSModule {}

export default USPSModule;
