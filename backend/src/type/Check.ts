export class Check {
  private _routeing: number;
  private _account: number;
  constructor(routeing: number, account: number) {
    this._routeing = routeing;
    this._account = account;
    this.verify();
  }
  private verify(): void {
    return;
  }
  public isValid(): boolean {
    return false;
  }
}

export default Check;
