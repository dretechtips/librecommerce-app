import { Injectable } from "@nestjs/common";
import { AppealDOT } from "./Appeal.interface";
import Appeal from "./Appeal.model";
import ServiceFactory from "src/app/common/service/Service.factory";

@Injectable()
export class AppealService extends ServiceFactory(Appeal) {}

export default AppealService;
