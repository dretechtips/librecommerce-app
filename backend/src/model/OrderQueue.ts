import Queue from '../data/Queue';
import Order from './Order';

export class OrderQueue extends Queue<Order> {
  private _hold: Map<string, Order>;
  constructor(vals?: Order[]) {
    super(vals);
  }
  public getAllOrders(): Order[] {
    return this._values;
  }
  public enqueue(order: Order): void {
    this._values.push(order);
  }
  public dequeue(): Order {
    const val: Order = this._values.shift();
    return val;
  }
  public getNext(): Order {
    return this._values[1];
  }
  public getNextOrderID(): string {
    return this.getNext().getValue().id;
  }
  public hold(): void {
    const order: Order = this._values.shift();
    this._hold.set(order.getValue().id, order);
  }
  public unhold(id: string): boolean {
    const order: Order = this._hold.get(id);
    if (order === undefined) return false;
    else return true;
  }
  public getHoldList(): Order[] {
    const orders: Order[] = Array.from(this._hold.values());
    return orders;
  }
}

export default OrderQueue;
