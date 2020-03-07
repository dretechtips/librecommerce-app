import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { StoreDOT } from "./Store.interface";
import { ValidateStoreIDPipe, ValidateStorePipe } from "./Store.pipe";
import StoreService from "./Store.service";

export const prefix = "store";

@Controller(prefix)
export class StoreController {
  constructor(private readonly store: StoreService) {}
  @Post("create")
  public create() {}
  @Get("find/:id")
  public async find(@Param("id", ValidateStoreIDPipe) id: string) {
    return (await this.store.get(id)).toJSON();
  }
  @Patch("update/:id")
  public async update(
    @Param("id", ValidateStoreIDPipe) id: string,
    @Body(prefix, ValidateStorePipe) storeDOT: StoreDOT
  ) {
    await this.store.update(id, storeDOT);
  }
}

export default StoreController;
