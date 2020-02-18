import { BP3D } from "binpackingjs";
import { Packable } from "./Packer.interface";

export class Item extends BP3D.Item {
  private item: Packable;
  constructor(item: Packable) {
    const dimensions = item.dimensions;
    super(
      dimensions.length + "x" + dimensions.width + "x" + dimensions.height,
      dimensions.width,
      dimensions.height,
      dimensions.length,
      0
    );
  }
  public getItem() {
    return this.item;
  }
}

export default Item;
