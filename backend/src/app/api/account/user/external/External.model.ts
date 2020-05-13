import { AccountLoginSchema } from "../../Account.interface";
import { AccountSchema } from "../../Account.model";
import Mixin from "src/app/common/mixin/Mixin.decorator";
import { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import User, { UserSchema } from "../User.model";
import { ExternalDOT } from "./External.interface";

class ExternalSchema extends UserSchema implements ExternalDOT {
  
}

export class External extends ExtendedModelFactory(User, ExternalSchema) {}

export default External;




