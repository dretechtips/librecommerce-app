import {
  PropOptionsWithValidate,
  MapPropOptions,
  ArrayPropOptions
} from "typegoose";

declare module "typegoose" {
  export * from "node_modules/typegoose/lib/typegoose";
  export interface PropOptionGetAndSet {
    get?: (value: any) => any;
    set?: (value: any) => any;
  }
  export function prop(
    options?: PropOptionsWithValidate & PropOptionGetAndSet
  ): (target: any, key: string) => void;
  export function mapProp(options: MapPropOptions & PropOptionGetAndSet);
  export function arrayProp(options: ArrayPropOptions & PropOptionGetAndSet);
}
