import { IDValidationPipeFactory } from "src/app/common/pipe/Pipe.factory";
import User from "./User.model";

export class ValidateUserIDPipe extends IDValidationPipeFactory(User) {}
