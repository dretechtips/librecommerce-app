import { Module, DynamicModule, Provider } from "@nestjs/common";
import { AvaliableLocation } from "./Location.interface";
import { LocationConnection } from "./Location.interface";
import LocationFactory from "./Location.factory";

@Module({
  controllers: []
})
export class LocationModule {
  public static connect(location: AvaliableLocation): DynamicModule {
    switch (location) {
      case AvaliableLocation.SANDBOX:
        return this.modularize(
          import("src/config/databases/Sandbox").then(cur => cur.connection),
          location
        );
      case AvaliableLocation.US:
        return this.modularize(
          import("src/config/databases/US").then(cur => cur.connection),
          location
        );
    }
  }
  private static modularize(
    config: Promise<LocationConnection>,
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
