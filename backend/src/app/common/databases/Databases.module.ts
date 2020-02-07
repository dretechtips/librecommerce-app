import { Module, DynamicModule, Provider } from "@nestjs/common";
import LocationModule from "./location/Location.module";
import { AvaliableLocation } from "./location/Location.interface";
import { Mongoose } from "mongoose";

@Module({
  controllers: []
})
export class DatabasesModule {
  public static connect(location: AvaliableLocation): DynamicModule {
    return LocationModule.connect(location);
  }
}

export default DatabasesModule;
