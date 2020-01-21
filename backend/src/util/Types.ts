export type Await<T extends Promise<any>> = T extends Promise<infer D>
  ? D
  : never;
