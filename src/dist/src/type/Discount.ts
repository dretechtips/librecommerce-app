export class Discount
{
  private discount: number;
  constructor(discount: number)
  {
    if(discount > 100)
    {
      this.discount = 100;
    }
    else if (discount < 0)
    {
      this.discount = 0;
    }
    else this.discount = discount;
  }
  public toNum() : number
  {
    return this.discount;
  }
  public apply(money: number): number
  {
    return parseFloat((money * this.discount).toFixed(2));
  }
}