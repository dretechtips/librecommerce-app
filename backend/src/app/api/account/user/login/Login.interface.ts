import { Types } from "mongoose";
import { AccountLoginDOT } from "../../Account.interface";
import { Model, Document } from "mongoose";
import Service from "src/app/common/service/Service.factory";
import InvalidDOTException from "src/app/common/exception/InvalidDOT.exception";

export interface LoginDOT {
  accountID: string;
  timestamp: Date;
}