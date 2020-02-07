import { Injectable } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { AvaliableLocation } from "./Location.interface";

export const token: symbol = Symbol();

@Injectable()
export class LocationService {
  constructor(
    private readonly mongoose: Mongoose,
    private readonly location: AvaliableLocation
  ) {}
  public where(): string {
    return AvaliableLocation[this.location];
  }
}

export default LocationService;
