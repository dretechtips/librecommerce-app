import { Body, Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { CompanyDOT } from "./Company.interface";
import { ValidateCompanyIDPipe, ValidateCompanyPipe } from "./Company.pipe";
import CompanyService from "./Company.service";

export const prefix = "company";

@Controller(prefix)
export class CompanyController {
  constructor(private readonly company: CompanyService) {}
  @Get("fetch/:id")
  public fetch(@Param("id", ValidateCompanyIDPipe) id: string) {
    if (id === "self") {
      return this.company.getSelf().then(cur => cur.toJSON());
    }
    return this.company.get(id).then(cur => cur.toJSON());
  }

  @Patch("update/:id")
  public update(
    @Param("id", ValidateCompanyIDPipe) id: string,
    @Body(prefix, ValidateCompanyPipe) dot: CompanyDOT
  ) {
    if (id === "self") {
      return this.company.updateSelf(dot);
    }
    return this.company.update(id, dot);
  }
  @Delete("disable/:id")
  public async disable(@Param("id", ValidateCompanyIDPipe) id: string) {
    await this.company.disable(id);
  }
}

export default CompanyController;
