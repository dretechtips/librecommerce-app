import { Measurement } from "./Measurement";

export enum SizeMeasurementUnit {
  INCH,
  FEET,
  YARD,
  CENTIMETER,
  MILLIMETER,
  METER
}

export class SizeMeasurement extends Measurement<typeof SizeMeasurementUnit> {
  public base: SizeMeasurementUnit;
  public convert: typeof SizeMeasurementUnit = {
    INCH: 25.4,
    FEET: 
  }
  public constructor(value: number, unit: SizeMeasurementUnit) {
    super(value, unit);
    this.base = SizeMeasurementUnit.MILLIMETER;
  }
}

export default SizeMeasurement;
