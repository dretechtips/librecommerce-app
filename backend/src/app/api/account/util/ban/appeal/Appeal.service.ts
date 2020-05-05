import { forwardRef, Inject, Injectable } from "@nestjs/common";
import Service from "../../../sale/subscription/node_modules/src/app/common/service/Service.factory";
import { BanLifetime } from "../Ban.interface";
import BanService from "../Ban.service";
import { AppealResolution } from "./Appeal.interface";
import Appeal from "./Appeal.model";

@Injectable()
export class AppealService extends Service<typeof Appeal> {
  constructor(
    @Inject(forwardRef(() => BanService)) private readonly ban: BanService
  ) {
    super(Appeal);
  }
  public async add(dot: any) {
    const doc = await super.add(dot);
    const ban = await this.ban.get(doc.banID);
    switch (doc.resolution) {
      case AppealResolution.RESOLVE:
        ban.revoke = true;
        break;
      case AppealResolution.REJECT:
        ban.lifetime = BanLifetime.PERMANENT;
        break;
    }
    ban.save();
    return doc;
  }
}

export default AppealService;
