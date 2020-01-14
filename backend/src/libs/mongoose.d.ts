type ExtractProps<T, TProps extends T[keyof T]> = Pick<
  T,
  ExtractPropsKey<T, TProps>
>;

type ExtractAllProps<T> = {
  [C in keyof T]: T[C];
}[keyof T];

type ExtractPropsKey<T, TProps extends T[keyof T]> = {
  [P in keyof T]: T[P] extends TProps
    ? TProps extends T[P]
      ? P
      : never
    : never;
}[keyof T];

type ArrayifyProps<T extends {}> = {
  [C in keyof T]: T[C][];
};

declare module "mongoose" {
  interface Schema<T = any> {
    new (definition?: SchemaDefinition, options?: SchemaOptions): Schema<T>;
  }

  interface MappedType {
    number: number;
    string: string;
    boolean: boolean;
    buffer: Buffer;
    array: ExtractAllProps<ArrayifyProps<Omit<MappedType, "array">>>;
    mixed: Object;
  }
  interface MappedValue {
    number: typeof Number | "Number";
    string: typeof String | "String";
    boolean: typeof Boolean | "Boolean";
    buffer: typeof Buffer | "Buffer";
    array: [ExtractAllProps<Omit<MappedValue, "array">>];
    mixed: typeof Object;
  }
  /**
   * Most errors within the typed schema will be caused by the Mapped Primitives and Reference
   */
  type TypedSchemaDefinition<
    T extends { [C in keyof T]: ExtractAllProps<MappedType> },
    C extends { [P in keyof MappedValue]: MappedType[P] } = MappedType,
    U extends { [P in keyof MappedType]: MappedValue[P] } = MappedValue
  > = {
    [C in keyof T]: ExtractPropsKey<MappedType, T[C]> extends string
      ? MappedValue[ExtractPropsKey<MappedType, T[C]>]
      : never;
  };
}
