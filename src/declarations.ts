declare global {
  interface AsyncGenerator<T = unknown, TReturn = any, TNext = unknown>
    extends AsyncIterator<T, TReturn, TNext>,
      Promise<TReturn> {}

  interface Generator<T = unknown, TReturn = any, TNext = unknown>
    extends Iterator<T, TReturn, TNext>,
      Promise<TReturn> {}
}

export {};

export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
