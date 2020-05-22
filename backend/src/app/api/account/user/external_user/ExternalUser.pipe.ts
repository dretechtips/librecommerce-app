import { ValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import ExternalService from "./ExternalUser.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class extends ValidationPipeFactory(ExternalService) {}