export class Dimension {
  private _length: number;
  private _width: number;
  private _height: number;
  private _unit: unit;
  constructor(length: number, width: number, height: number, unit: unit) {
    this.setLength(length);
    this.setWidth(width);
    this.setHeight(height);
    this.setUnit(unit);
  }
  public toString() {
    return `${this._length}x${this._width}x${this._height}${this._unit}`;
  }
  public setLength(length: number): Dimension {
    this._length = length;
    return this;
  }
  public setWidth(width: number): Dimension {
    this._width = width;
    return this;
  }
  public setHeight(height: number): Dimension {
    this._height = height;
    return this;
  }
  public setUnit(unit: unit): Dimension {
    this._unit = unit;
    return this;
  }
  public getLength(): number {
    return this._length;
  }
  public getHeight(): number {
    return this._height;
  }
  public getWidth(): number {
    return this._width;
  }
  public getVolume(): string {
    return (this._length * this._height * this._width) + this._unit;
  }
}

type unit = "in" | "ft" | "yd" | "cm" | "m";