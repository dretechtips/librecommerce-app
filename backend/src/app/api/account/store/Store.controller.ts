import { Controller } from "@nestjs/common";
import { StoreService } from "./Store.service";

export const prefix = "store";

@Controller(prefix)
export class StoreController {
  
  constructor( private readonly store: StoreService ) {  }

}