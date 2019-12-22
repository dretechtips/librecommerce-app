interface TraverselCallback {
  (node: Branch | Leaf<any>, parent: Branch, level: number): void;
}

/**
 * Level Index Starts At 0
 */
export class Tree {
  private root: Branch;
  constructor(obj: Object) {
    this.root = new Branch(obj, 0);
  }
  public traverselBF(callback: TraverselCallback) {}
  public traverselDF(callback: TraverselCallback) {}
  public traverselAF(callback: TraverselCallback) {}
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
  constructor(data: Object, level: number) {
    this.children = new Map();
    this.generate(data);
    this.level = level;
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
          new Branch(obj[key as keyof Object], this.level + 1)
        );
      } else {
        this.children.set(
          key,
          new Leaf<any>(obj[key as keyof Object], this.level + 1)
        );
      }
    });
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
    const object: any = {};
    Array.from(this.children.entries()).map(cur => {
      if (cur[1] instanceof Leaf) {
        object[cur[0]] = cur[1].getData();
      } else if (cur[1] instanceof Branch) {
        object[cur[0]] = cur[1].toObject();
      }
    });
    return object;
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
  public getlevel(): number {
    return this.level;
  }
}
