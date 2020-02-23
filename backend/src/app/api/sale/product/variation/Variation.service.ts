import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Variation from "./Variation.model";

@Injectable()
export class VariationService extends Service<typeof Variation> {}

export default VariationService;
