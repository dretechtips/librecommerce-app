import { Injectable, Scope } from "@nestjs/common";
import { AccountDOT } from "./Account.interface";
import TagService from "src/common/services/Tag.service";

@Injectable()
export class AccountService {
  constructor(public readonly tag: TagService<AccountDOT>) {}
}

export default AccountService;