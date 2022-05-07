declare global {
  interface AsyncGenerator<T = unknown, TReturn = any, TNext = unknown>
    extends AsyncIterator<T, TReturn, TNext>,
      Promise<TReturn> {}

  interface Generator<T = unknown, TReturn = any, TNext = unknown>
    extends Iterator<T, TReturn, TNext>,
      Promise<TReturn> {}
}

export {};
