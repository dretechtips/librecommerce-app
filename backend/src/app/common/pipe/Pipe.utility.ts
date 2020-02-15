import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException
} from "@nestjs/common";

export class ToDatePipe implements PipeTransform<any, Date> {
  public transform(value: any, meta: ArgumentMetadata): Date {
    if (!(value instanceof String) || !(value instanceof String))
      throw new TypeError("Invalid Value Type");
    const val: string | number = value as string | number;
    if (!this.isDate(val)) throw new Error("Cannot parse value.");
    return new Date(val);
  }
  public isDate(date: number | string) {
    return new Date(date).toString() !== "Invalid Date";
  }
}
