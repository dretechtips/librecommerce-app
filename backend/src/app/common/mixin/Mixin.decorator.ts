import { Constructor } from "./Mixin.interface";
import { ExtractMethodKeys } from "src/util/Types";




/**
 * Mixin the implemented interface / abstract class required for the class to be operational
 * @param includes Then classes that needs to be included
 * @error Compile Type Incomptibility - You need to implement a mixin interface before you use a mixin
 */
export function Mixin<E>(...includes: Constructor<E>[]) {
  return function <T extends { new(...args: any[]): E } >(ctor: T) {
    includes.forEach(include => {
      Object.getOwnPropertyNames(include.prototype).forEach(name => {
        const description = Object.getOwnPropertyDescriptor(include.prototype, name);
        if(!description)
          throw new Error("Mixin Failed");
        Object.defineProperty(ctor.prototype, name, description);
      });
    });
    return ctor;
  }
}

export function Delegate(method: (...args: any[]) => any) {
  return function (target: Object, key: string) {
    target.constructor.prototype[key] = method;
  }
}

/**
 * This method decorator implements delegate smartly by allowing you to choose which class method to implement
 */
export function SmartDelegate<T>(ctor: Constructor<T>) {
  return function (target: Object, key: ExtractMethodKeys<T>) {
    if(target instanceof ctor)
      target.constructor.prototype[key] = ctor.prototype[key];
  }
}

export default Mixin;