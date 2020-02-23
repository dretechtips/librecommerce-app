import { Controller, Get, Param } from "@nestjs/common";
import PackageService from "./Package.service";

export const prefix = "package";

@Controller(prefix)
export class PackageController {
  constructor(private readonly _package: PackageService) {}
  @Get("fetch/:id")
  public async fetch(@Param("id") id: string) {
    return (await this._package.get(id)).toJSON();
  }
}

export default PackageController;
