import { Typegoose } from "typegoose";
import ModelFactory from "src/app/common/model/Model.factory";

class PackageSchema extends Typegoose {}

export class Package extends ModelFactory(PackageSchema) {}

export default Package;
