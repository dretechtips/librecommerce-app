export interface Form<T> {
  title: string;
  questions: { [C in keyof T]: FormQuestion<T[C]> };
}

/**
 * @typedef T Expected Type
 */
export type FormQuestion<T> = {};
