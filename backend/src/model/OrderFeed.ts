import * as e from 'events';
import Order from './Order';
import * as ws from 'ws';

export class OrderFeed extends e.EventEmitter {
  constructor() {
    super();
  }
  public add(order: Order): void {
    this.emit('add', order);
  }
  private pushToFeed(client: ws, order: Order): void {
    client.send(order.toPrimObj());
  }
  private setEvent(name: string, listener: (...args: any[]) => void): void {
    this.on(name, listener);
  }
  public subscribe(wss: ws.Server): void {
    wss.on('connection', client => {
      this.on('add', order => this.pushToFeed(client, order));
    });
  }
}

export default OrderFeed;
