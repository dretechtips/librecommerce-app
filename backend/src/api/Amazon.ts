import fs = require("fs");
import AmazonMWS = require("amazon-mws");
// VS IS BUGGED THIS IS USELESS
import {} from "../interface/Billing.interface";

class Amazon {
  private _mws: AmazonMWS;
  constructor(clientID: string, clientKey: string) {
    this._mws = new AmazonMWS();
    this._mws.setApiKey(clientID, clientKey);
  }
  public product() {
    return new Product(this._mws);
  }
}

class Product {
  private _mws: AmazonMWS;
  constructor(amazon: AmazonMWS) {
    this._mws = amazon;
  }
  add(): void {
    this._mws.feeds.submit();
  }
  remove(): void {}
  update(): void {}
}
