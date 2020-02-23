import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Pallet from "./Pallet.model";

@Injectable()
export class PalletService extends Service<typeof Pallet> {}

export default PalletService;
