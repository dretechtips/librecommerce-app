import { BP3D } from "binpackingjs";
import Box from "../packages/package/box/Box.model";
import Item from "./Item";
import { PackInto } from "./Packer.interface";

export class Bin extends BP3D.Bin {
  private storage: PackInto;
  public items: Item[];
  constructor(storage: PackInto) {
    const dimensions = storage.dimensions;
    super(
      dimensions.length + "x" + dimensions.width + "x" + dimensions.height,
      dimensions.width,
      dimensions.height,
      dimensions.length,
      0
    );
    this.storage = storage;
  }
  public getStorage() {
    return this.storage;
  }
}

export default Bin;
