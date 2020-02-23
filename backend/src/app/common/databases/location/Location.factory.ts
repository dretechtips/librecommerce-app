import { FactoryProvider } from "@nestjs/common/interfaces";
import { AvaliableLocation, LocationConnection } from "./Location.interface";
import LocationService, { token } from "./Location.service";

export const LocationFactory = function(
  location: AvaliableLocation,
  imported: LocationConnection
): FactoryProvider {
  return {
    provide: token,
    useFactory: async () => {
      const connection = await imported;
      const url: string =
        "mongodb://" +
        connection.USERNAME +
        ":" +
        connection.PASSWORD +
        "@" +
        connection.PATH;
      const m = await mongoose.connect(url, undefined);
      return new LocationService(m, location);
    }
  };
};

export default LocationFactory;
