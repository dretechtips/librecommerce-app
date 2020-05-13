import { Types } from "mongoose";
import { AccountLoginDOT } from "../../Account.interface";
import { Model, Document } from "mongoose";
import Service from "src/app/common/service/Service.factory";
import InvalidDOTException from "src/app/common/exception/InvalidDOT.exception";

export interface LoginDOT {
  accountID: string;
  timestamp: Date;
}

export abstract class LoginBasedService<T extends Document & AccountLoginDOT> extends Service<T> {
  
  public async hasDuplicateUsername(username: string): Promise<boolean> {
    return this.findAllByProp<"username">("username", username)[0] ? true : false;
  }

  public async add(dot: any): Promise<T> {
    if(await this.validateDOT(dot)) {
      const d: AccountLoginDOT = dot;
      if(!(await this.hasDuplicateUsername(d.username)))
        return super.add(dot);
    }

    throw new InvalidDOTException();
  }

  public async update(id: string | Types.ObjectId, dot: any): Promise<T> {
    if(await this.validateDOT(dot)) {
      const d: AccountLoginDOT = dot;
      if(!(await this.hasDuplicateUsername(d.username)))
        return super.update(id, dot);
    }

    throw new InvalidDOTException();
  }
  
}