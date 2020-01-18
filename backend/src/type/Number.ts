export class int extends Number {
  constructor(number: Number) {
    super(number);
    this.strip();
  }
  private strip(): void {
    this.toFixed(0);
  }
}
