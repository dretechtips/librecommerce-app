import { Module } from "@nestjs/common";
import PromoController from "./Promo.controller";
import PromoService from "./Promo.service";

@Module({
  controllers: [PromoController],
	providers: [PromoService]
})
export class PromoModule {
  
}

export default PromoModule;