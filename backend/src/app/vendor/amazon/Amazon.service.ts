import { Injectable } from "@nestjs/common";
import AmazonMWS from "amazon-mws";

@Injectable()
export class AmazonService {
  private mws: AmazonMWS;
  constructor() {
    this.mws = new AmazonMWS();
  }
  public useMWS(): AmazonMWS {
    return this.mws;
  }
}
