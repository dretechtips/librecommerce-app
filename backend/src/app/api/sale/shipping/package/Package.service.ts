import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import Service from "src/app/common/service/Service.factory";
import Variation from "../../product/variation/Variation.model";
import VariationService from "../../product/variation/Variation.service";
import Box from "../box/Box.model";
import BoxService from "../box/Box.service";
import Bin from "../packer/Bin";
import Item from "../packer/Item";
import Packer from "../packer/Packer";
import { PackageDOT } from "./Package.interface";
import Package from "./Package.model";

@Injectable()
export class PackageService extends Service<typeof Package>
  implements OnModuleInit {
  private variation: VariationService;
  private box: BoxService;
  constructor(private readonly moduleRef: ModuleRef) {
    super(Package);
  }
  public onModuleInit() {
    this.variation = this.moduleRef.get(VariationService);
    this.box = this.moduleRef.get(BoxService);
  }
  public async create(items: Variation[]): Promise<Package[]> {
    const packages = await this.getOptimial(items);
    await Promise.all(packages.map(cur => cur.save()));
    return packages;
  }
  public async getOptimial(items: Variation[]): Promise<Package[]> {
    const variations: Variation[] = await this.variation.getAll(
      items.map(cur => cur.productID)
    );
    const boxes = (await this.box.findAll()).filter(cur => !cur.quantity);
    const packer: Packer = new Packer(boxes.map(cur => new Bin(cur)));
    packer.addItems(variations.map(cur => new Item(cur)));
    packer.pack();
    return packer.getUsedBins().map(cur => {
      let bin: Bin | null = packer.getBiggerBinThanWithLWH(cur);
      if (!bin) bin = cur;
      const box: Box = bin.getStorage() as Box;
      const _package: PackageDOT = {
        boxID: box._id,
        productIDs: cur.getItems().map(cur => (cur.getItem() as Variation)._id)
      };
      return new Package(_package);
    });
  }
}

export default PackageService;
