import { ColorConstructor } from "../interface/Color.interface";

export class Color
{
  private _color: ColorConstructor;
  private _colorArray: string[] = 
  ["black",
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
  constructor(color: ColorConstructor | string | string[])
  {
    if(typeof color === "string")
    {
      const colorConst = this.stringToColor(color);
      this._color = colorConst;
    }
    else if (Array.isArray(color))
    {
      const colorConst = this.strArrayToColor(color);
      this._color = colorConst;
    }
    else 
    {
      for(let cur in color)
      {
        if(color[cur] === undefined)
        {
          color[cur] === false;
        }
      }
      this._color = color;
    }
  }
  public toString(): string
  {
    let colorArray: string[];
    const colorsProp = Object.keys(this._color);
    for(let i = 0 ; i < colorsProp.length; i++)
    {
      if(this._color[colorsProp[i]] === true)
      {
        colorArray.push(colorsProp[i]);
      }
    }
    return colorArray.join('/');
  }
  private stringToColor(color: string): ColorConstructor
  {
    const colorConst: ColorConstructor = {};
    for(let cur of this._colorArray)
    {
      if(color.search(cur) !== -1)
      {
        colorConst[cur] = true;
      }
      else
      {
        colorConst[cur] = false;
      }
    }
    return colorConst;
  }
  private strArrayToColor(color: string[]): ColorConstructor
  {
    const colorConst: ColorConstructor = {};
    for(let cur of this._colorArray)
    {
      if(this._colorArray.find(now => now === cur))
      {
        colorConst[cur] === true;
      }
      else colorConst[cur] === false;
    }
    return colorConst;
  }
}