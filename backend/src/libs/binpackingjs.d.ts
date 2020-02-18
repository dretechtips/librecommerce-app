declare module "binpackingjs" {

  export namespace BP3D {
    declare class Box {
      protected name: string;
      protected width: number;
      protected height: number;
      protected depth: number;
      public getName(): string;
      public getWidth(): number;
      public getHeight(): number;
      public getDepth(): number;
      public getVolume(): number;
    }
    export declare class Bin extends Box {
      public maxWeight: number;
      public items: Item[] = [];
      constructor(
        name: string,
        width: number,
        height: number,
        depth: number,
        maxWeight?: number
      ): Bin;
      public getMaxWeight(): number;
      public getItems(): Item[];
      public getPackedWeight(): number;
      public weighItem(item: Item): boolean;
      public putItem(item: Item, position: [number, number, number]): boolean;
    }
    declare const RotationType_WHD: number = 0;
    declare const RotationType_HWD: number = 1;
    declare const RotationType_HDW: number = 2;
    declare const RotationType_DHW: number = 3;
    declare const RotationType_DWH: number = 4;
    declare const RotationType_WDH: number = 5;
    declare const WidthAxis: number = 0;
    declare const HeightAxis: number = 1;
    declare const DepthAxis: number = 2;
    declare const StartPosition: [number, number, number] = [0, 0, 0];
    declare const RotationTypeStrings = {
      [RotationType_WHD]: 'RotationType_WHD (w,h,d)',
      [RotationType_HWD]: 'RotationType_HWD (h,w,d)',
      [RotationType_HDW]: 'RotationType_HDW (h,d,w)',
      [RotationType_DHW]: 'RotationType_DHW (d,h,w)',
      [RotationType_DWH]: 'RotationType_DWH (d,w,h)',
      [RotationType_WDH]: 'RotationType_WDH (w,d,h)',
    };
    export declare class Item extends Box {
      public rotationType: number = RotationType_WHD;
      public position: [number, number, number] = [];
      constructor(name: string, width: number, height: number, depth: number, weight: number);
      public getRotationType(): number;
      public getRotationTypeString(): string;
      public getDimension(): [number, number, number];
      public intersect(other: Item): number;
    }
    declare const rectIntersect = function(a: Item, b: Item, x: number, y: number): number;
    export declare class Packer {
      public bins: Bin[];
      public items: Item[];
      public unfitItems: Item[];
      public addBin(bin: Bin): void;
      public addItem(item: Item): void;
      public findFittedBin(item: Item): Bin;
      public getBiggerBinThan(bin: Bin): Bin | null;
      public unfitItem(): void;
      public packToBin(bin: Bin, item: Item): Item[];
      public pack(): null;
    }
  }
}
