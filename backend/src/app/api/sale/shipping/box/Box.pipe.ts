import { Injectable } from "@nestjs/common";
import {
  IDValidationPipeFactory,
  ValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";
import BoxService from "./Box.service";

@Injectable()
export class ValidateBoxPipe extends ValidationPipeFactory(BoxService) {}

@Injectable()
export class ValidateBoxIDPipe extends IDValidationPipeFactory(BoxService) {}
