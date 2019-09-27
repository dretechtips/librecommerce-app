export type color = "black" | "blue" | "brown" | "cyan" | "green" | "grey" | "magenta" | "orange" | "pink" |
  "violet" | "red" | "white" | "yellow";

export class Color
{
  private _color: color[];
  private static _avalColor: color[] = ["black",
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
    "yellow"];;
  constructor(color: color[])
  {
    this._color = color;
  }
  public toString(): string
  {
    return this._color.join('/');
  }
  public static listAll(): color[] {
    return this._avalColor;
  }
}