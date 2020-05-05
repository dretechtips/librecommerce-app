import { Controller, Get, Body, Param, Delete, Patch } from "@nestjs/common";
import PromoService from "./Promo.service";
import { PromoDOT } from "./Promo.interface";

export const prefix = "promo";

@Controller(prefix)
export class PromoController {
  constructor(private readonly promo: PromoService) {}

  @Get("fetch/:id")
  public async fetch(@Param("id") id: string) {
    return this.promo.get(id);
  }

  @Delete("remove/:id")
  public async remove(@Param("id") id: string) {
    // TODO
  }

  @Patch("update/:id")
  public async update(@Param("id") id: string, @Body(prefix) promo: PromoDOT) {
    // TODO
  }


  
}

export default PromoController;
