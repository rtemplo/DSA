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

// More generic memoization function that can handle any function signature
const basicFunction = (a: number, b: number) => ({ a, b }); // a basic function.

// a type that represents an array of unknown arguments
type Args = unknown[];
// A function that takes a variable amount of unknown arguments and returns a result of unknown type
type VariadicFunction<A extends Args = Args, R = unknown> = (...args: A) => R;

// Function that takes a function as an argument and returns a nested function.
const withFunctionAsArg = <A extends unknown[], R>(
  func: VariadicFunction<A, R>
): VariadicFunction<A, R> => {
  const cache = new Map<string, R>();

  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      const cachedResult = cache.get(key);
      if (cachedResult !== undefined) {
        return cachedResult;
      }
    }

    // This handles the case where the cached result is undefined
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
};

const memoizedBasicFunction = withFunctionAsArg(basicFunction);
const test1 = memoizedBasicFunction(1, 2);
const test2 = memoizedBasicFunction(1, 2); // hits cache, same closure/cache as test1
