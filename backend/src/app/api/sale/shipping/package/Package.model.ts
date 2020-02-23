import { Typegoose } from "typegoose";
import { PackageDOT } from "./Package.interface";
import { prop } from "typegoose/lib/prop";
import ModelFactory from "src/app/common/model/Model.factory";

class PackageSchema extends Typegoose implements PackageDOT {
  @prop({ required: true })
  public boxID: string;
  @prop({ required: true })
  public productIDs: string[];
}

export class Package extends ModelFactory(PackageSchema) {}

export default Package;
