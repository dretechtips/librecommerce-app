import StaticImplements from "src/util/StaticImplements";
import { DataType } from "./Type.interface";

@StaticImplements<DataType<number>>()
export class Int {
  public static get(value: number): number {
    return Number(value.toFixed(0));
  }
  public static set(value: number): number {
    return Number(value.toFixed(0));
  }
}

export default Int;
