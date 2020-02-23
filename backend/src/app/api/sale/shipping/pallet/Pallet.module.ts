import { Module } from "@nestjs/common";
import PalletService from "./Pallet.service";

@Module({
  controllers: [],
  providers: [PalletService]
})
export class PalletModule {}

export default PalletModule;
