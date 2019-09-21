import { Queue } from "./Queue";

export enum TREE_STATUS {
  COMPLETED,
  PAST_LIMIT,
  PARENT_DOES_NOT_EXIST,
}

export class Tree<T> {
  private _root: Node<T>;

  constructor(data: T) {
    const node: Node<T> = new Node<T>(data);
    this._root = node;
  }
  public contains(callback: (node: Node<T>) => void, traversel: (callback: (node: Node<T>) => void) => void) {
    traversel.call(this, callback);
  }
  public addToHead(data: T) {
    this.add(data, this._root.getData(), this.tranverseBFS);
  }
  public add(data: T, toData: T, traversel: (callback: (node: Node<T>) => void) => void): TREE_STATUS {
    let child: Node<T> = new Node(data);
    let parent: Node<T> = null;
    let callback: (node: Node<T>) => void = (node) => {
      if (node.getData() === toData) {
        parent = node;
      }
    };
    this.contains(callback, traversel);
    if (parent) {
      const add: boolean = parent.add(child);
      if (add) {
        child.setParent(parent);
        return TREE_STATUS.COMPLETED;
      }
      else {
        return TREE_STATUS.PAST_LIMIT;
      }
    }
    else {
      return TREE_STATUS.PARENT_DOES_NOT_EXIST;
    }

  }
  public remove(data: T, fromData: T, traversel: (callback: (node: Node<T>) => void) => void): Node<T> {
    const tree: Tree<T> = this;
    let parent: Node<T> = null;
    let index: number = 0;
    const callback: (node: Node<T>) => void = (node) => {
      if (node.getData() === fromData) {
        parent = node;
      }
    }
    this.contains(callback, traversel);
    if (parent) {
      index = parent.getChildrens().findIndex(cur => cur.getData() === data);
      if (index === -1) {
        return null;
      }
      else {
        return parent.getChildrens()[index];
      }
    }
    else {
      return null;
    }
  }
  public tranverseBFS(callback: (node: Node<T>) => void): void {
    const queue: Queue<Node<T>> = new Queue();
    let cur: Node<T> = queue.dequeue();
    while (cur) {
      const childrens: Node<T>[] = cur.getChildrens();
      for (let i = 0; i < childrens.length; i++) {
        queue.enqueue(childrens[i]);
      }
      callback(cur);
      cur = queue.dequeue();
    }
  }
}

class Node<T> {
  private _data: T;
  private _parent: Node<T>;
  private _children: Node<T>[];
  private _limit: number;
  constructor(data) {
    this._data = data;
    this._parent = null;
    this._children = [];
    this._limit = -1;
  }
  public add(node: Node<T>): boolean {
    if (this._limit === (this._children.length + 1)) {
      return false;
    }
    else {
      this._children.push(node);
      return true;
    }
  }
  public setParent(parent: Node<T>) {
    this._parent = parent;
  }
  public setLimit(limit: number) {
    this._limit = limit;
  }
  public getChildrens(): Node<T>[] {
    return this._children;
  }
  public getData(): T {
    return this._data;
  }
}