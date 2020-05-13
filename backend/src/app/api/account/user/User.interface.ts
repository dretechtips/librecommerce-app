import { AccountDOT, AccountLoginDOT } from "../Account.interface";
import Service from "src/app/common/service/Service.factory";
import Account from "../Account.model";
import User from "./User.model";
import { Types } from "mongoose";

export interface UserDOT extends AccountDOT, AccountLoginDOT {
  
}