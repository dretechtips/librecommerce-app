import { ExtractProps, ExtractPropsKey } from "../utils/Types";

/**
 *
 * @param object Object being extracted from
 * @param propsTypes Extraction Type
 * @typedef T Object Type
 * @typedef K Object Prop Type || Expected Object Type
 */
export function extract<K>(
  object: any,
  propTypes: { new (...value: any): any }[]
): K;
export function extract<T extends { [x: string]: any }, K extends T[keyof T]>(
  object: T,
  propsTypes: { new (...value: any): K }[]
): ExtractProps<T, K> {
  const nObj: any = {};
  Object.keys(object).forEach(key => {
    for (let i = 0; i < propsTypes.length; i++) {
      const curType = propsTypes[i];
      if (object[key] instanceof curType) {
        nObj[key] = object[key];
        break;
      }
    }
  });
  return nObj;
}
