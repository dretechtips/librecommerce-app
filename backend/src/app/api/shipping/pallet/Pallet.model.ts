import { Typegoose, prop, arrayProp } from "typegoose";
import ModelFactory from "src/app/common/model/Model.factory";
import { PalletDOT } from "./Pallet.interface";

class PalletSchema extends Typegoose implements PalletDOT {
  @arrayProp({ required: true })
  public packageIDs: string[];
}

export class Pallet extends ModelFactory(PalletSchema) {}

export default Pallet;
