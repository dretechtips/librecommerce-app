import { Injectable } from "@nestjs/common";
import { BoxItem } from "../packages/package/box/Box.interface";
import { BP3D } from "binpackingjs";
import Bin from "./Bin";
import Item from "./Item";

/**
 * First Fit Bin Packing Algorihthm + Auto Add Bins if MAX CAPACITY is reached
 * @typedef T Item Type packer is storing
 * @see https://github.com/olragon/binpackingjs
 */
export class Packer {
  private used: Bin[];
  private availiable: Bin[];
  private itemsLeft: Item[];
  private unfitItems: Item[];
  constructor(avaliable: Bin[]) {
    this.availiable = avaliable;
  }
  public addItem(item: Item): void {
    this.itemsLeft.push(item);
  }
  public addItems(items: Item[]): void {
    this.itemsLeft.push(...items);
  }
  private getFittestAvailiableBin(item: Item): Bin | null {
    for (let i = 0; i < this.availiable.length; i++) {
      let bin = this.availiable[i];
      if (!bin.weighItem(item) || !bin.putItem(item, BP3D.StartPosition))
        continue;
      const use = new Bin(bin.getStorage());
      return use;
    }
    return null;
  }
  private getFittestUsedBin(item: Item): Bin | null {
    for (let i = 0; i < this.used.length; i++) {
      let bin = this.used[i];
      if (!bin.weighItem(item) || !bin.putItem(item, BP3D.StartPosition))
        continue;
      if (bin.getItems().length === 1 && bin.getItems()[0] === item)
        bin.items = [];
      return bin;
    }
    return null;
  }
  public findFittestBin(item: Item): Bin | null {
    const used = this.getFittestUsedBin(item);
    if (used) return used;
    const availiable = this.getFittestAvailiableBin(item);
    if (availiable) {
      this.used.push(availiable);
      return availiable;
    }
    return null;
  }
  public getBiggerBinThan(bin: Bin): Bin | null {
    let volume = bin.getVolume();
    for (let i = 0; i < this.availiable.length; i++) {
      let other = this.availiable[i];
      if (other.getVolume() > volume) return other;
    }
    return null;
  }
  public getBiggerBinThanWithLWH(bin: Bin): Bin | null {
    let length = bin.getDepth();
    let width = bin.getWidth();
    let height = bin.getHeight();
    for (let i = 0; i < this.availiable.length; i++) {
      let other = this.availiable[i];
      if (
        other.getDepth() > length &&
        other.getWidth() > width &&
        other.getHeight() > height
      )
        return other;
    }
    return null;
  }
  public unfitItem(): void {
    if (this.itemsLeft.length === 0) return;
    this.unfitItems.push(this.itemsLeft[0]);
    this.itemsLeft.splice(0, 1);
  }
  public packToBin(bin: Bin, items: Item[]): Item[] {
    let other: Bin | null = null;
    let unpacked: any[] = [];
    let fit =
      bin.weighItem(items[0]) && bin.putItem(items[0], BP3D.StartPosition);
    if (!fit) {
      other = this.getBiggerBinThan(bin);
      if (other) return this.packToBin(other, items);
      return this.itemsLeft;
    }
    for (let i = 0; i < this.itemsLeft.length; i++) {
      let fitted: boolean = false;
      let item = this.itemsLeft[i];
      if (bin.weighItem(item)) {
        lookup: for (let pt = 0; pt < 3; pt++) {
          for (let j = 0; j < bin.items.length; j++) {
            let pv: [number, number, number] = [0, 0, 0];
            let ib: Item = bin.items[j];
            switch (pt) {
              case BP3D.WidthAxis:
                pv = [
                  ib.position[0] + ib.getWidth(),
                  ib.position[1],
                  ib.position[2]
                ];
                break;
              case BP3D.HeightAxis:
                pv = [
                  ib.position[0],
                  ib.position[1] + ib.getHeight(),
                  ib.position[2]
                ];
                break;
              case BP3D.DepthAxis:
                pv = [
                  ib.position[0],
                  ib.position[1],
                  ib.position[2] + ib.getDepth()
                ];
                break;
            }
            if (bin.putItem(item, pv)) {
              fitted = true;
              break lookup;
            }
          }
        }
      }
      if (!fitted) {
        while (other !== null) {
          other = this.getBiggerBinThan(bin);
          if (other) {
            other.items.push(item);
            let left = this.packToBin(other, other.items);
            if (left.length === 0) {
              bin = other;
              fitted = true;
              break;
            }
          }
        }
        if (!fitted) unpacked.push(item);
      }
    }
    return unpacked;
  }
  public pack(): void {
    this.itemsLeft = this.itemsLeft.sort(
      (a, b) => a.getVolume() - b.getVolume()
    );
    this.availiable = this.availiable.sort(
      (a, b) => a.getVolume() - b.getVolume()
    );
    this.used = this.used.sort((a, b) => a.getVolume() - b.getVolume());
    while (this.itemsLeft.length > 0) {
      let bin = this.findFittestBin(this.itemsLeft[0]);
      if (bin === null) {
        this.unfitItem();
        continue;
      }
      this.itemsLeft = this.packToBin(bin, this.itemsLeft);
    }
  }
  public getUsedBins(): Bin[] {
    return this.used;
  }
}

export default Packer;
