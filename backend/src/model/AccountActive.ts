import Time from '../type/Time';
import uuid = require('uuid/v4');
import Account from './Account';
import { ServerError, ClientError } from 'type/Error';

export class AccountActive {
  private _session: Map<string, string>;
  protected _timeout: Time;
  constructor(accounts?: Account[]) {
    this._session = new Map();
    if (accounts) {
      for (let account of accounts) {
        this._session.set(uuid(), account.getID());
      }
    }
    this._timeout = new Time(3, 'h');
    this._timeout.toMilliSeconds();
  }
  public add(account: Account): string {
    const id: string = uuid();
    this._session.set(id, account.getID());
    return id;
  }
  public delete(accessToken: string): boolean {
    return this._session.delete(accessToken);
  }
  public fetch(accessToken: string): string | null {
    try {
      const accountID: string | undefined = this._session.get(accessToken);
      if (!accountID)
        throw new ClientError('Client provided an invalid access token');
      return accountID;
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
      return null;
    }
  }
}

export default AccountActive;
