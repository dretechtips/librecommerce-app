import { ClientError } from '../model/Error';
import crypto = require('crypto');

export class Password {
  private _value: string;
  constructor(password: string) {
    try {
      const valid: boolean = this.verify(password);
      if (!valid)
        throw new ClientError(
          "Client provided a password that doesn't match the criteria."
        );
      else this._value = password;
    } catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  private verify(pw: string): boolean {
    // 6 - 12 Character
    // NO "" or '' or / \
    if (pw.length < 6 || pw.length > 12) return false;
    const filter: string[] = ['"', "'", '`', '"', '/'];
    for (let term of filter) {
      const index: number = this._value.search(term);
      if (index !== -1) return false;
    }
    return true;
  }
  public encrypt(): string {
    // Write Crypto Method
  }
  public decrypt(): string {
    // Write crypto method
  }
  public toString(): string {
    return this._value;
  }
}
