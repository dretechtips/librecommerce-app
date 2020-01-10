export type NoInfer<T> = [T][T extends any ? 0 : never];

export type NoRequired<T extends {}> = {
  [C in keyof T]: T[C] extends Required<T>[C] ? never : T[C];
};

export type ExtractProps<T, TProps extends T[keyof T]> = Pick<
  T,
  ExtractPropsKey<T, TProps>
>;

export type ExtractPropsKey<T, TProps extends T[keyof T]> = {
  [P in keyof T]: T[P] extends TProps ? P : never;
}[keyof T];

export type Primitives =
  | boolean
  | null
  | undefined
  | number
  | bigint
  | string
  | symbol;

export type AnyMap = { [x: string]: any };

export type ExtractPrimitives<T> = {
  [C in keyof T]: T[C] extends Primitives ? T[C] : never;
};

export type ExtractObjects<T> = {
  [C in keyof T]: T[C] extends Primitives ? never : T[C];
};
