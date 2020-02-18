import { Injectable } from "@nestjs/common";
import Package from "./Packages.model";
import Service from "src/app/common/service/Service.factory";

@Injectable()
export class PackageService extends Service<typeof Package> {}

export default PackageService;
