import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Appeal from "./appeal/Appeal.model";
import AppealService from "./appeal/Appeal.service";
import { BanDOT } from "./Ban.interface";
import Ban from "./Ban.model";

@Injectable()
export class BanService extends Service<typeof Ban> {
  constructor(private readonly appeal: AppealService) {
    super(Ban);
  }
  public async addRecent(banDOT: Omit<BanDOT, "date">): Promise<Ban> {
    return this.add({
      ...banDOT,
      date: new Date().toString()
    });
  }
  public async getAppeals(banID: string): Promise<Appeal[]> {
    return this.appeal.findAllByProp("banID", banID);
  }
}

export default BanService;
