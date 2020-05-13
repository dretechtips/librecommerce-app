import { ArgumentMetadata, Injectable } from "@nestjs/common";
import { ValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import { BanDOT } from "./Ban.interface";
import BanService from "./Ban.service";
import Ban from "./Ban.model";

@Injectable()
export class ValidateBan extends ValidationPipeFactory(BanService) {} 
