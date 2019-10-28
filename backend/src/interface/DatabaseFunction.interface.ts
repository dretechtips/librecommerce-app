export interface DatabaseValue {
  key: string;
  value: any;
}

export enum Operation {
  C = "CREATE",
  R = "READ",
  U = "UPDATE",
  D = "DELETE"
}

export interface SearchValue extends DatabaseValue {
  clause: SearchClause;
}

export interface Search {
  find: SearchValue[];
  and?: SearchValue[][];
  or?: SearchValue[][];
}

export type SearchClause = "=" | "<" | "<=" | ">" | ">=" | "!=";
