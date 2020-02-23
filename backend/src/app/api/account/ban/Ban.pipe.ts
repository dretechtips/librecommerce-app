import { ArgumentMetadata, Injectable } from "@nestjs/common";
import { ValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import { BanDOT } from "./Ban.interface";
import BanService from "./Ban.service";

@Injectable()
export class ValidateBanPipe extends ValidationPipeFactory(BanService) {
  public transform(value: any, meta: ArgumentMetadata) {
    (value as BanDOT).date = new Date();
    return this.transform(value, meta);
  }
}
