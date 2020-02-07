import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import APIModule from "./api/API.module";
import VendorModule from "./vendor/Vendor.module";
import DatabasesModule from "src/app/common/databases/Databases.module";
import { AvaliableLocation } from "./common/databases/location/Location.interface";
import { AppLoggerMiddleware } from "./app.middleware";

@Module({
  imports: [
    DatabasesModule.connect(AvaliableLocation.US),
    APIModule,
    VendorModule
  ],
  exports: [APIModule, VendorModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    this.logger(consumer);
  }
  public logger(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}

export default AppModule;
