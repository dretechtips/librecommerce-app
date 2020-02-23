import {
  IDsValidationPipeFactory,
  ValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";
import SaleService from "./Sale.service";

export class ValidateSaleIDPipe extends ValidationPipeFactory(SaleService) {}

export class ValidateSalePipe extends IDsValidationPipeFactory(SaleService) {}
