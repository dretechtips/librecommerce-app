export type Await<T extends Promise<any>> = T extends Promise<infer D>
  ? D
  : never;

export type ExtractProps<T, TProps extends T[keyof T]> = Pick<
  T,
  ExtractPropsKey<T, TProps>
>;

export type ExtractAllProps<T> = {
  [C in keyof T]: T[C];
}[keyof T];

export type ExtractPropsKey<T, TProps> = {
  [P in keyof T]: T[P] extends TProps
    ? TProps extends T[P]
      ? P
      : never
    : never;
}[keyof T];

export type ArrayifyProps<T extends {}> = {
  [C in keyof T]: T[C][];
};

export type ExtractArrayType<T extends Array<any>> = T extends Array<infer D>
  ? D
  : never;

export type ExtractArrayPropKey<T> = {
  [C in keyof T]: T[C] extends Array<any> ? C : never;
}[keyof T];

export type ExtractArrayProp<T> = Pick<T, ExtractArrayPropKey<T>>;

export type IDOnly = { id: string };

export type IDsOnly = { ids: string[] };
