import { Injectable } from "@nestjs/common";
import ServiceFactory from "src/app/common/service/Service.factory";
import Wage from "./Wage.model";

@Injectable()
export class WageService extends ServiceFactory(Wage) {}

export default WageService;
