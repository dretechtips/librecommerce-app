import { Module } from "@nestjs/common";
import PromoController from "./Promo.controller";

@Module({
	controllers: [PromoController],
})
export class PromoModule {

}

export default PromoModule;