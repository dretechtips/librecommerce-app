import rfdc from "rfdc";

interface TraverselCallback {
  (node: Branch | Leaf<any>, parent: Branch | null, level: number): void;
}

/**
 * Level Index Starts At 0
 */
export class Tree {
  private root: Branch;
  constructor(obj: Object) {
    // this.root = new Branch(JSON.parse(JSON.stringify(obj)), 0);
    this.root = new Branch(obj, 0, "root");
  }
  /**
   * This is bugged
   */
  public traverselBF(callback: TraverselCallback): void {
    const queue: (Leaf<any> | Branch)[] = [];
    queue.push(this.root);
    let current = queue.pop() as Branch | Leaf<any>;
    let parent = null;
    while (current) {
      if (current instanceof Branch) {
        const childrens = Array.from(current.getChildrens().values());
        for (let i = 0; i < childrens.length; i++) {
          queue.push(childrens[i]);
        }
      }
      if (current instanceof Branch) {
        callback(current, parent, current.getLevel());
        parent = current;
      }
      current = queue.pop() as Branch | Leaf<any>;
    }
  }
  public traverselDF(callback: TraverselCallback): void {
    function recursive(node: Branch | Leaf<any>, parent: Branch | null) {
      if (node instanceof Branch) {
        const childrens = Array.from((node as Branch).getChildrens().values());
        for (let i = 0; i < childrens.length; i++) {
          recursive(childrens[i], node);
        }
      }
      callback(node, parent, node.getLevel());
    }
    recursive(this.root, null);
  }
  public clearLeafs(): void {
    this.traverselDF((node, parent, level) => {
      if (node instanceof Leaf) node = new Leaf<undefined>(undefined, level);
    });
  }
  public toObject(): Object {
    return this.root.toObject();
  }
  public getTotalChildrenSize(branch?: Branch): number {
    let total = 0;
    this.traverselDF(node => {
      if (node instanceof Branch) total += node.getChildrenSize();
    });
    return total;
  }
}

export class Branch {
  private children: Map<string, Branch | Leaf<any>>;
  private level: number;
  private data: Object;
  private name: string;
  constructor(data: Object, level: number, name: string) {
    this.children = new Map();
    this.level = level;
    this.data = data;
    this.name = name;
    this.generate(data);
  }
  private generate(obj: Object) {
    const keys: string[] = Object.keys(obj);
    keys.forEach(key => {
      if (
        typeof obj[key as keyof Object] === "object" &&
        !Array.isArray(obj[key as keyof Object])
      ) {
        this.children.set(
          key,
          new Branch(obj[key as keyof Object], this.level + 1, key)
        );
      } else {
        this.children.set(
          key,
          new Leaf<any>(obj[key as keyof Object], this.level + 1)
        );
      }
    });
  }
  public getName(): string {
    return this.name;
  }
  public getChildrens(): Map<string, Branch | Leaf<any>> {
    return this.children;
  }
  public getLevel = () => this.level;
  public getChildren(key: string): Branch | Leaf<any> | undefined {
    return this.children.get(key);
  }
  public getChildrenName(children: Branch | Leaf<any>): string | undefined {
    const iterable = Array.from(this.children.entries());
    for (let [key, prop] of iterable) {
      if (prop === children) return key;
    }
    return undefined;
  }
  public getChildrenSize(): number {
    return this.children.size;
  }
  public toObject(): Object {
    return this.data;
  }
  public replace(prev: Branch | Leaf<any>, next: Branch | Leaf<any>): boolean {
    const name = this.getChildrenName(prev);
    if (!name) return false;
    this.children.set(name, next);
    // Cannot reassign this.data because this.data is a reference / alias called by sharing
    // Meaning you can only modify the INTERNALS
    if (next instanceof Branch) {
      (this.data as { [key: string]: any })[name] = next.data;
    }
    if (next instanceof Leaf) {
      (this.data as { [key: string]: any })[name] = next.getData();
    }
    return true;
  }
}

export class Leaf<T> {
  private data: T;
  private level: number;
  constructor(data: T, level: number) {
    this.data = data;
    this.level = level;
  }
  public getData(): T {
    return this.data;
  }
  public getLevel(): number {
    return this.level;
  }
}
