const expensiveAdd = (a: number, b: number) => {
  // expensive operation
  return a + b;
};

type Primitive = string | number | boolean | null | undefined | symbol | bigint;

// biome-ignore lint/suspicious/noExplicitAny: memoize function needs to accept any function signature
const memoize = <Args extends any[], R extends Primitive>(
  func: (...args: Args) => R
): ((...args: Args) => R) => {
  const cache = new Map<string, R>();

  return (...args: Args): R => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as R;
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
};

const memoizedAdd = memoize(expensiveAdd);

console.log(memoizedAdd(1, 2)); //3
console.log(memoizedAdd(1, 2)); //3
