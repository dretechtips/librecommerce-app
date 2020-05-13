import Account, { AccountSchema } from "../Account.model";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import { UserDOT } from "./User.interface";
import Mixin from "src/app/common/mixin/Mixin.decorator";
import { AccountLoginSchema } from "../Account.interface";

export interface UserSchema extends UserDOT {}
@Mixin(AccountLoginSchema)
export class UserSchema extends AccountSchema implements UserDOT {
  

  
}

export class User extends ExtendedModelFactory(Account, UserSchema) {}

export default User;