import { ValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import ExternalService from "./External.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class extends ValidationPipeFactory(ExternalService) {}