import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { RestrictAccess } from "../../../login/Login.decorator";
import { AccountType } from "../../Account.interface";
import { ValidateAccountID } from "../../Account.pipe";
import { NewUserDOT, UserDOT } from "./User.interface";
import {
  ValidateNewUserPipe,
  ValidateUserIDPipe,
  ValidateUserPipe
} from "./User.pipe";
import UserService from "./User.service";

export const prefix = "user";

@Controller("user")
@RestrictAccess(AccountType.ADMIN)
export class UserController {
  constructor(private readonly user: UserService) {}
  /**
   * @todo Attach on schedule and payroll service to user service
   * @param accountID Attached by the Create Account Middleware
   * @param user Client Data
   */
  @Post("create/:accountID")
  public async create(
    @Param("accountID", ValidateAccountID) accountID: string,
    @Param(prefix, ValidateNewUserPipe) user: NewUserDOT
  ) {
    return (await this.user.new(accountID, user))._id;
  }
  @Get("get/positions")
  public getPositionEnum(): string[] {
    return this.user.getPositions();
  }
  @Get("find/:userID")
  public async find(@Param(prefix, ValidateUserIDPipe) userID: string) {
    return (await this.user.get(userID)).toJSON();
  }
  @Patch("update/:userID")
  public async update(
    @Param(prefix, ValidateUserIDPipe) userID: string,
    @Body(prefix, ValidateUserPipe) user: UserDOT
  ): Promise<void> {
    await this.update(userID, user);
  }
}

export default UserController;
