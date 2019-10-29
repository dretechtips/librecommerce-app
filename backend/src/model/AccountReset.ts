import Time from '../type/Time';
import Account from './Account';
import AccountActive from './AccountActive';

export class AccountReset extends AccountActive {
  constructor(accounts?: Account[]) {
    super(accounts);
    this._timeout = new Time(24, 'h');
  }
}

export default AccountReset;
