import { Injectable } from "@nestjs/common";
import { BanLifetime, BanDOT } from "../Ban.interface";
import { AppealStatus, AppealDOT } from "./Appeal.interface";
import Appeal from "./Appeal.model";
import Service from "src/app/common/service/Service.factory";
import InvalidDOTException from "src/app/common/exception/InvalidDOT.exception";

@Injectable()
export class AppealService extends Service<typeof Appeal> {
  constructor() {
    super(Appeal);
  }

  public async add(dot: any) {
    if(await this.validateDOT(dot)) {
      const d: AppealDOT = dot;
      d.status = AppealStatus.PROCESSING;
      d.reviewedBy = "";
      return super.add(d);
    }
    throw new InvalidDOTException();
  }
  
  /**
   * Gives a ban a resolution
   * @param appealID Appeal ID
   */
  public async resolve(appealID: string, status: AppealStatus): Promise<BanLifetime> {
    const appeal = await this.get(appealID);
    if(appeal.status != status) {
      appeal.status = status;
      await appeal.save();
    }
    return this.getSentence(status);
  }

  /**
   * Get the ban duration for each enum status
   * @param status AppealStatus
   */
  private getSentence(status: AppealStatus): BanLifetime {
    switch(status) {
      case AppealStatus.PROCESSING:
        return BanLifetime.TEMPORARY;
      case AppealStatus.DECLINE:
        return BanLifetime.PERMANENT;
      case AppealStatus.ACCEPTED:
        return BanLifetime.NONE;
      default:
        return BanLifetime.TEMPORARY;
    }
  }

  public getLatest(ban: BanDOT): string {
    return ban.appealIDs[ban.appealIDs.length - 1];
  }

}

export default AppealService;
