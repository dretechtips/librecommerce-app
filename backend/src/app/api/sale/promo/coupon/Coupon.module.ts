import { Module } from "@nestjs/common";
import { CouponController } from "./Coupon.controller";

@Module({
	controllers: [CouponController]
})
export class CouponModule {

}

export default CouponModule;