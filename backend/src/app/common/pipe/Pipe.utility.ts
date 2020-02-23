import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

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

/**
 * Seperator [+] is used to generate an Array from string and also a trim is added to every item within the Array
 */
export class ToArrayPipe implements PipeTransform<string, string[]> {
  public transform(value: string, meta: ArgumentMetadata): string[] {
    return value.split("+").map(cur => cur.trim());
  }
}

export class ToNumberPipe implements PipeTransform<string, number> {
  public transform(value: string, meta: ArgumentMetadata): number {
    return Number(value);
  }
}
