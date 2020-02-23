import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import {
  IDValidationPipeFactory,
  ValidationPipeFactory
} from "src/app/common/pipe/Pipe.factory";
import { NewUserDOT, UserPositions } from "./User.interface";
import UserService from "./User.service";

@Injectable()
export class ValidateUserIDPipe extends IDValidationPipeFactory(UserService) {}

export class ValidateUserPipe extends ValidationPipeFactory(UserService) {}

@Injectable()
export class ValidateNewUserPipe implements PipeTransform {
  public transform(value: NewUserDOT, meta: ArgumentMetadata) {
    if (!UserPositions[value.position]) throw new TypeError("Invalid Enum");
  }
}
