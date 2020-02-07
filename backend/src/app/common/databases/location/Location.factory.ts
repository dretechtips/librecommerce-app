import { FactoryProvider } from "@nestjs/common/interfaces";
import { LocationConnection, AvaliableLocation } from "./Location.interface";
import LocationService from "./Location.service";
import { mongoose } from "src/app/common/factory/Model.factory";
import { token } from "./Location.service";

export const LocationFactory = function(
  location: AvaliableLocation,
  imported: Promise<LocationConnection>
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
