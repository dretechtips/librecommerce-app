import {
  Controller,
  Post,
  Next,
  Param,
  Inject,
  forwardRef,
  Get
} from "@nestjs/common";
import { RestrictAccount } from "../Account.decorator";
import UserService from "./User.service";
import { ValidateAccountID } from "../Account.pipe";
import { UserDOT, PreUserDOT } from "./User.interface";
import { ValidateUserIDPipe } from "./User.pipe";

export const prefix = "user";

@Controller("user")
export class UserController {
  constructor(private readonly user: UserService) {}
  /**
   * @todo Attach on schedule and payroll service to user service
   * @param accountID Attached by the Create Account Middleware
   * @param user Client Data
   */
  @Post("create/:accountID")
  @RestrictAccount("admin")
  public async create(
    @Param("accountID", ValidateAccountID) accountID: string,
    @Param(prefix) user: PreUserDOT
  ) {
    return (await this.user.new(accountID)).id();
  }
  @Get("positions")
  public getPositions(): string[] {
    return this.user.getPositions();
  }
  @Get("find:/userID")
  public async find(@Param(prefix, ValidateUserIDPipe) userID: string) {
    return (await this.user.get(userID)).data();
  }
}

export default UserController;
