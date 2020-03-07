import ModelFactory from "src/app/common/model/Model.factory";
import DimensionSchema from "src/app/common/model/schema/Dimension.schema";
import WeightSchema from "src/app/common/model/schema/Weight.schema";
import { Typegoose } from "typegoose";
import { prop } from "typegoose/lib/prop";
import { PackageDOT } from "./Package.interface";

class PackageSchema extends Typegoose implements PackageDOT {
  @prop({ required: true })
  public productIDs: string[];
  @prop({ required: true })
  public dimension: DimensionSchema;
  @prop({ required: true })
  public totalWeight: WeightSchema;
}

export class Package extends ModelFactory(PackageSchema) {}

export default Package;
