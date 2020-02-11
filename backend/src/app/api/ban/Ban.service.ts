import { Injectable } from "@nestjs/common";
import ServiceFactory from "src/app/common/service/Service.factory";
import Ban from "./Ban.model";
import { BanDOT } from "./Ban.interface";
import { AccountDOT } from "../account/Account.interface";

@Injectable()
export class BanService extends ServiceFactory(Ban) {
  constructor() {
    super();
  }
  public async addRecent(banDOT: Omit<BanDOT, "date">): Promise<Ban> {
    return this.add({
      ...banDOT,
      date: new Date().toString()
    });
  }
}

export default BanService;
