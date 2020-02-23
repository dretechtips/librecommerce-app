import { DynamicModule, Module } from "@nestjs/common";
import * as Sandbox from "src/config/databases/Sandbox";
import * as US from "src/config/databases/US";
import LocationFactory from "./Location.factory";
import { AvaliableLocation, LocationConnection } from "./Location.interface";

@Module({
  controllers: []
})
export class LocationModule {
  public static connect(location: AvaliableLocation): DynamicModule {
    switch (location) {
      case AvaliableLocation.SANDBOX:
        return this.modularize(Sandbox.connection, location);
      case AvaliableLocation.US:
        return this.modularize(US.connection, location);
    }
  }
  private static modularize(
    config: LocationConnection,
    location: AvaliableLocation
  ): DynamicModule {
    const service = LocationFactory(location, config);
    return {
      module: LocationModule,
      providers: [service],
      exports: [service]
    };
  }
}

export default LocationModule;
