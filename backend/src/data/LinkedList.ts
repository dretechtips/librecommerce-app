export class LinkedList<T> {
  private _head: Node<T> = null;
  private len: number = 0;
  public append(elem: T) {
    const node: Node<T> = new Node<T>(elem);
    let cur: Node<T>;
    if (this._head == null)
      this._head = node;
    else {
      cur = this._head;
      while (cur.getNext()) {
        cur = cur.getNext();
      }
      cur.setNext(node);
    }
    this.len++;
  }
  public removeAt(pos: number): T {
    if (pos > -1 && pos < this.len) {
      let cur: Node<T> = this._head;
      let prev: Node<T>;
      let index = 0;
      if (pos === 0) {
        this._head = cur.getNext();
      }
      else {
        while (index++ < pos) {
          prev = cur;
          cur = cur.getNext();
        }
        prev.setNext(cur.getNext());
      }
      this.len--;
      return cur.getElem();
    }
    else {
      return null;
    }
  }
  public insert(elem: T, pos: number): boolean {
    if (pos > -1 && pos < this.len) {
      let cur: Node<T> = this._head;
      let prev: Node<T>;
      let index: number = 0;
      let node = new Node<T>(elem);
      if (pos === 0) {
        node.setNext(cur);
      }
      else {
        while (index++ < pos) {
          prev = cur;
          cur = cur.getNext();
        }
        node.setNext(cur);
        prev.setNext(node);
      }
      this.len++;
      return true;
    }
    else {
      return false;
    }
  }
  public toString() {
    let cur: Node<T> = this._head;
    let str: string = "";
    while (cur) {
      str += cur.getElem().toString();
      str += " => ";
      cur.setNext(cur.getNext());
    }
    return str;
  }
}

class Node<T> {
  private _elem: T;
  private _next: Node<T>;
  constructor(elem: T) {
    this._elem = elem;
    this._next = null;
  }
  public getNext(): Node<T> {
    return this._next;
  }
  public setNext(node: Node<T>) {
    this._next = node;
  }
  public getElem(): T {
    return this._elem;
  }
}