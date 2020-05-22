import { Injectable } from "@nestjs/common";
import AppealService from "./appeal/Appeal.service";
import { BanDOT, BanLifetime, BanDependentDOT } from "./Ban.interface";
import Ban from "./Ban.model";
import Service from "src/app/common/service/Service.factory";
import { AppealStatus } from "./appeal/Appeal.interface";
import { InjectModel } from "src/app/common/model/Model.decorator";

@Injectable()
@InjectModel(Ban)
export class BanService extends Service<Ban> {

  private static allowReviewablePermaBan: boolean = false;

  constructor(
    private readonly appeal: AppealService
  ) {
    super();
  }

  /**
   * Resolves the latest the ban with the latest appeal and a manuel reviewer
   * @param banID Ban ID
   * @param status Appeal Status by Reviewer
   */
  public async resolve(banID: string, status: AppealStatus): Promise<Ban> {
    const ban = await this.get(banID);
    if(ban.revoke || (!BanService.allowReviewablePermaBan && ban.lifetime === BanLifetime.PERMANENT))
      return ban;
    const latestID = this.appeal.getLatest(ban);
    const sentence = await this.appeal.resolve(latestID, status);
    if(sentence === BanLifetime.NONE) 
      ban.revoke = true;
    ban.lifetime = sentence;
    await this.update(ban._id, ban);
    return ban;
  }
  /**
   * Checks if the doc is banned from using our service
   * @param dot Ban Dependent DOT
   */
  public async isBanned<T extends BanDependentDOT>(dot: T): Promise<boolean> {
    const ban = await this.get(await this.getLatestID(dot));
    if(!ban.revoke)
      return true;
    return false;
  }

  public getLatestID<T extends BanDependentDOT>(dot: T): string {
    return dot.banIDs[dot.banIDs.length - 1];
  }
  
}

export default BanService;
