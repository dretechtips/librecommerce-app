import { AccountLoginSchema } from "../../Account.interface";
import { AccountSchema } from "../../Account.model";
import Mixin from "src/app/common/mixin/Mixin.decorator";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import User, { UserSchema } from "../User.model";
import { ExternalUserDOT } from "./ExternalUser.interface";

class ExternalUserSchema extends UserSchema implements ExternalUserDOT {
  
}

export class ExternalUser extends ExtendedModelFactory(User, ExternalUserSchema) {}

export default ExternalUser;




