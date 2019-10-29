import Ban from './Ban';
import uuid = require('uuid/v4');
import {
  Constructor,
  AppealBody,
  SearchQuery
} from '../interface/BanAppeal.interface';

export class BanAppeal {
  private readonly _message: string;
  private readonly _case: string;
  private readonly _ban: Ban;
  private readonly _timestamp: Date;
  private _resolution: 'resolve' | 'reject' | 'incomplete';
  public static search(query: Partial<SearchQuery>): BanAppeal[] {
    // Database Method
  }
  constructor(value: Constructor) {
    this._message = value.msg;
    this._case = uuid();
    this._ban = value.ban;
    this._timestamp = new Date();
    this._resolution = 'incomplete';
  }
  public getMessage(): string {
    return this._message;
  }
  public getCaseID(): string {
    return this._case;
  }
  public getBan(): Ban {
    return this._ban;
  }
  public hasResolution(): boolean {
    if (!this._resolution) {
      return false;
    } else {
      return true;
    }
  }
  public getResolution(): 'resolve' | 'reject' | 'incomplete' {
    return this._resolution;
  }
  public setResolution(res: 'resolve' | 'reject') {
    this._resolution = res;
  }
  public add() {
    // Database Method
  }
  public save() {
    // Database Method
  }
  public toPrimObj(): AppealBody {
    return {
      ban: this._ban.toPrimObj(),
      caseID: this._case,
      message: this._message
    };
  }
}

export default BanAppeal;
