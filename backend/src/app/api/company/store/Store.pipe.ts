import { Injectable } from "@nestjs/common";
import {
  IDValidationPipeFactory,
  ValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";
import StoreService from "./Store.service";

@Injectable()
export class ValidateStorePipe extends ValidationPipeFactory(StoreService) {}

@Injectable()
export class ValidateStoreIDPipe extends IDValidationPipeFactory(
  StoreService
) {}
