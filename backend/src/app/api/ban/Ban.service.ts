import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Ban from "./Ban.model";
import { BanDOT } from "./Ban.interface";
import { AccountDOT } from "../account/Account.interface";

@Injectable()
export class BanService extends Service<Ban> {
  constructor() {
    super(Ban);
  }
  public async addRecent(banDOT: Omit<BanDOT, "date">): Promise<Ban> {
    return this.add({
      ...banDOT,
      date: new Date().toString()
    });
  }
}

export default BanService;
