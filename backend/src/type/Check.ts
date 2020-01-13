import { PersistableData } from "../interface/Model.interface";

export class Check implements PersistableData {
  private routing: number;
  private account: number;
  constructor(routeing: number, account: number) {
    this.routing = routeing;
    this.account = account;
    this.verify();
  }
  private verify(): void {
    return;
  }
  public isValid(): boolean {
    return false;
  }
  public persist() {
    return {
      routing: this.routing,
      account: this.account,
    }
  }
}

export default Check;
