import { Injectable, Inject } from "@nestjs/common";
import LocationService, {
  token as locationToken
} from "./location/Location.service";

@Injectable()
export class DatabasesService {
  constructor(
    @Inject(locationToken) private readonly location: LocationService
  ) {}
  public getLocation(): string {
    return this.location.where();
  }
}

export default DatabasesService;
