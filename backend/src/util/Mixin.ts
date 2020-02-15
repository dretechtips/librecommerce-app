export function mixin(
  derived: { new (...arg: any): any },
  inherits: { new (...arg: any): any }[]
) {
  inherits.forEach(inherit => {
    Object.getOwnPropertyNames(inherit.prototype).forEach(name => {
      Object.defineProperty(
        derived.prototype,
        name,
        Object.getOwnPropertyDescriptor(inherit.prototype, name) as any
      );
    });
  });
}

export default mixin;
