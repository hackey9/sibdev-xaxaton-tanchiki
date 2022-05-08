export function createExternalPromise<T = void>() {
  let resolveWith!: (value: T) => void;
  const promise = new Promise<T>((resolve) => {
    resolveWith = resolve;
  });

  return { promise, resolveWith };
}
