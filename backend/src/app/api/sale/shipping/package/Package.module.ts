import { Module } from "@nestjs/common";
import PackageService from "./Package.service";

@Module({
  controllers: [],
  providers: [PackageService]
})
export class PackageModule {}

export default PackageModule;
