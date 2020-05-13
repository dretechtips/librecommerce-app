import { Injectable, Inject } from "@nestjs/common";
import User from "./User.model";
import Service from "src/app/common/service/Service.factory";
import ExternalService from "./external/External.service";
import InternalService from "./internal/Internal.service";
import { Types } from "mongoose";
import { UserDOT } from "./User.interface";
import InvalidDOTException from "src/app/common/exception/InvalidDOT.exception";
import { InjectModel } from "src/app/common/model/Model.decorator";
import { LoginBasedService } from "../util/login/Login.interface";
import Mixin from "src/app/common/mixin/Mixin.decorator";

export interface UserService extends LoginBasedService<User> {}
@Injectable()
@InjectModel(User)
@Mixin(class extends LoginBasedService<User> {})
export class UserService extends Service<User> {

  constructor(
    private readonly internal: InternalService, 
    private readonly external: ExternalService
  ) {
    super();
  }

  // public async add(dot: any): Promise<T> {
  //   if(await this.validateDOT(dot) && this.hasDuplicateUsername((dot as UserDOT).username)) 
  //     return super.add(dot);
  //   throw new InvalidDOTException();
  // }

  // public async update(id: string | Types.ObjectId, dot: any): Promise<T> {
  //   if(await this.validateDOT(dot) && this.hasDuplicateUsername((dot as UserDOT).username)) 
  //     return super.update(id, dot);
  //   throw new InvalidDOTException();
  // }

  // /**
  //  * Helper method to check if an account has a duplicate username within the database
  //  * @param username Account Username
  //  */
  // private async hasDuplicateUsername(username: string): Promise<boolean> {
  //   const usernames = await this.findAllByProp("username", username);
  //   return usernames[1] ? true : false;
  // }

}

export default UserService;