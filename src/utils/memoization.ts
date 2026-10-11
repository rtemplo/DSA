const expensiveAdd = (a: number, b: number) => {
  // expensive operation
  return a + b;
};
const expensiveMultiply = (a: number, b: number) => {
  // expensive operation
  return a * b;
};
const concatString = (a: string, b: string, c: string) => `${a} ${b}${c}`;

const memoize = <Args extends unknown[], R = unknown>(
  func: (...args: Args) => R
): ((...args: Args) => R) => {
  const cache = new Map<string, R>();

  return (...args) => {
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
console.log(memoizedAdd(1, 2)); //3 - from cache

const memoizedMultiply = memoize(expensiveMultiply);
console.log(memoizedMultiply(2, 3)); //6
console.log(memoizedMultiply(2, 3)); //6 - from cache

const memoizedConcatString = memoize(concatString);
console.log(memoizedConcatString("Hello", "World", "!")); // "Hello World"
console.log(memoizedConcatString("Hello", "World", "!")); // "Hello World" - from cache
