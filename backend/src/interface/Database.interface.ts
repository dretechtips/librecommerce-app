import DatabaseAction from '../helper/DatabaseAction';

export interface Encryption {
  key: string;
  iv: Buffer;
}

export type Value<T = any> = T;

export type CompareClause = '=' | '<' | '<=' | '>' | '>=' | '!=';

export interface ValueCompare<T = any> {
  a: Value<T>;
  b: Value<T>;
  compare: CompareClause;
}

export type SearchParam<T = any> = Value<T> | ValueCompare<T>;

export enum Operation {
  C = 'CREATE',
  R = 'READ',
  U = 'UPDATE',
  D = 'DELETE'
}

export interface Search {
  find: SearchParam[];
  and?: SearchParam[];
  or?: SearchParam[];
}
/**
 * @param I Search Query Interface
 */
export type SearchQuery<I> = Partial<{ [P in keyof I]: Value<I[P]> }>;

export interface Result {
  data: any[][];
  error: boolean;
}

export type ActionCallback<U> = (
  callback: (action: DatabaseAction<U>) => void
) => void;
