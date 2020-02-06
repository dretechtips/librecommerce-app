import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import APIModule from "./api/API.module";
import VendorModule from "./vendor/Vendor.module";
import DatabaseModule from "src/database/Database.module";

@Module({
  imports: [
    APIModule,
    VendorModule,
    DatabaseModule.forRoot("./config/mongoose/credientals.txt")
  ],
  exports: [APIModule, VendorModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

export default AppModule;
