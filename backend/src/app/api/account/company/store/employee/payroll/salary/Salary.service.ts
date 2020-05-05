import { Injectable } from "@nestjs/common";
import ServiceFactory from "src/app/common/service/Service.factory";
import Salary from "./Salary.model";

@Injectable()
export class SalaryService extends ServiceFactory(Salary) {}

export default SalaryService;
