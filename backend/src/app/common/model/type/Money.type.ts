import { DataType } from "./Type.interface";
import StaticImplements from "src/util/StaticImplements";

@StaticImplements<DataType<number>>()
export class Money {
  private constructor() {}
  public static set(value: number): number {
    return Number(value.toFixed(2));
  }
  public static get(value: number): number {
    return Number(value.toFixed(2));
  }
}

export default Money;
