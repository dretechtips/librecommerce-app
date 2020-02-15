import { Module } from "@nestjs/common";
import UPSService from "./UPS.service";

@Module({
  controllers: [],
  providers: [UPSService]
})
export class UPSModule {}

export default UPSModule;
