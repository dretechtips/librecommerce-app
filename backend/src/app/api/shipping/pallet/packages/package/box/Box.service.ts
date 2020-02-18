import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Box from "./Box.model";
import Bin from "../../../packer/Bin";
import Packer from "../../../packer/Packer";
import Item from "../../../packer/Item";
import { Packable } from "../../../packer/Packer.interface";

@Injectable()
export class BoxService extends Service<typeof Box> {
  public async findSmallestBoxes(items: Packable[]): Promise<Box[]> {
    const bins: Bin[] = (await this.findAll())
      .filter(cur => !cur.quantity)
      .map(cur => new Bin(cur));
    const packer = new Packer(bins);
    packer.addItems(items.map(cur => new Item(cur)));
    packer.pack();
    return packer.getUsedBins().map(cur => cur.getStorage() as Box);
  }
  /**
   * This will not get the box size based off the volume but in terms of L W H
   * @param boxes Box++
   */
  public async nextBoxesSize(boxes: Box[]): Promise<Box[]> {
    const bins: Bin[] = (await this.findAll())
      .filter(cur => !cur.quantity)
      .map(cur => new Bin(cur));
    const packer = new Packer(bins);
    return boxes
      .map(cur => packer.getBiggerBinThanWithLWH(new Bin(cur)))
      .map((cur, index) => (cur == null ? bins[index] : cur))
      .map(cur => cur.getStorage() as Box);
  }
}

export default BoxService;
