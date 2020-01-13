import { PersistableData } from "../interface/Model.interface";

export type color = "blue" | "brown" | "cyan" | "green" | "grey" | "magenta" | "orange" | "pink" |
  "violet" | "red" | "white" | "yellow" | "black" ;

export class Color implements PersistableData
{
  private _color: color[];
  constructor(color: color[] | string)
  {
    if (typeof color === "string") 
      this._color = this.parseColor(color);
    else
      this._color = color;
  }
  private parseColor(color: string): color[]
  {
    return color.split('/').map(cur => cur.trim()) as color[];
  }
  public toString(): string
  {
    return this._color.join('/');
  }
  public static listAll(): color[]
  {
    return ["black",
      "blue",
      "brown",
      "cyan",
      "green",
      "grey",
      "magenta",
      "orange",
      "pink",
      "violet",
      "red",
      "white",
      "yellow"];
  }
  public persist()
  {
    return this._color;
  }
}

export default Color;