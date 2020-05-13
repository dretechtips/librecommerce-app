import { Injectable } from "@nestjs/common";
import { DisableableDOT } from "./Disableable.interface";
import { Document } from "mongoose";

@Injectable()
export class DisableableService {
  constructor() {}

  public async disable<T extends DisableableDOT & Document>(doc: T): Promise<T>  {
    if(doc.active)
      await doc.save();
    return doc;
  }

  public isDisable(doc: DisableableDOT & Document): boolean {
    return !doc.active;
  }
}

export default DisableableService;