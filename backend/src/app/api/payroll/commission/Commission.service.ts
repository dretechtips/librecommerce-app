import { Injectable } from "@nestjs/common";
import ServiceFactory from "src/app/common/service/Service.factory";

@Injectable()
export class CommissionService extends ServiceFactory() {}

export default CommissionService;
