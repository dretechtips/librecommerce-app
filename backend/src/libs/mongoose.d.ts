type ExtractProps<T, TProps extends T[keyof T]> = Pick<
  T,
  ExtractPropsKey<T, TProps>
>;

type ExtractAllProps<T> = {
  [C in keyof T]: T[C];
}[keyof T];

export type ExtractPropsKey<T, TProps extends T[keyof T]> = {
  [P in keyof T]: T[P] extends TProps
    ? TProps extends T[P]
      ? P
      : never
    : never;
}[keyof T];

type ArrayifyProps<T extends {}> = {
  [C in keyof T]: T[C][];
};

type ExtractArrayType<T extends Array<any>> = T extends Array<infer D>
  ? D
  : never;

declare module "mongoose" {
  interface Schema<T = any> {
    new (
      definition?: TypedSchemaDefinition<T>,
      options?: SchemaOptions
    ): Schema<T>;
  }

  interface MappedType {
    number: number;
    string: string;
    boolean: boolean;
    buffer: Buffer;
    mixed: Object;
    // Add Array
  }
  interface MappedValue {
    number: typeof Number;
    string: typeof String;
    boolean: typeof Boolean;
    buffer: typeof Buffer;
    mixed: typeof Object;
    // Add Array
  }
  /**
   * Most errors within the typed schema will be caused by the Mapped Primitives and Reference
   */
  type TypedSchemaDefinition<
    T extends {
      [C in keyof T]:
        | ExtractAllProps<MappedType>
        | ExtractAllProps<ArrayifyProps<MappedType>>;
    }
  > = {
    [C in keyof T]: T[C] extends []
      ? [
          TypedDefaultSchemaDefinition<{
            ["default"]: ExtractArrayType<T[C]>;
          }>["default"]
        ]
      : TypedDefaultSchemaDefinition<{ ["default"]: T[C] }>["default"];
  };

  type TypedDefaultSchemaDefinition<
    T extends { [C in keyof T]: ExtractAllProps<MappedType> },
    C extends { [P in keyof MappedValue]: MappedType[P] } = MappedType,
    U extends { [P in keyof MappedType]: MappedValue[P] } = MappedValue
  > = {
    [C in keyof T]: T[C] extends { [x: string]: any }
      ? ExtractAllProps<T[C]> extends MappedType[keyof MappedType]
        ? TypedDefaultSchemaDefinition<T[C]>
        : never
      : ExtractPropsKey<MappedType, T[C]> extends string
      ? MappedValue[ExtractPropsKey<MappedType, T[C]>]
      : never;
  };
  // type TypedArraySchemaDefinition<
  //   T extends { [C in keyof T]: ExtractAllProps<ArrayifyProps<MappedType>> },
  //   C extends {
  //     [P in keyof ArrayifyProps<MappedValue>]: ArrayifyProps<MappedType>[P];
  //   } = ArrayifyProps<MappedType>,
  //   U extends {
  //     [P in keyof ArrayifyProps<MappedType>]: ArrayifyProps<MappedValue>[P];
  //   } = ArrayifyProps<MappedValue>
  // > = {
  //   [C in keyof T]: T[C] extends { [x: string]: any }[]
  //     ? ExtractAllProps<T[C]> extends ArrayifyProps<
  //         MappedType
  //       >[keyof MappedType]
  //       ? TypedArraySchemaDefinition<T[C]>
  //       : never
  //     : ExtractPropsKey<ArrayifyProps<MappedType>, T[C]> extends String
  //     ? ArrayifyProps<MappedValue>[ExtractPropsKey<
  //         ArrayifyProps<MappedType>,
  //         T[C]
  //       >]
  //     : never;
  // };
}
