import {
  ExtractAllProps,
  ArrayifyProps,
  ExtractArrayType,
  ExtractPropsKey,
} from "../util/Types";

declare module "mongoose" {
  interface Document {
    /**
     * Mongoose Discriminator Key
     */
    __t: string;
  }

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
}
