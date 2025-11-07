/** * Example Algorithm: Fibonacci Sequence
 * Time Complexity: O(n) - Linear (good)
 * Space Complexity: O(n)
 */
const fibbonacci = (n: number): number[] => {
  const sequence: number[] = [0, 1];
  for (let i = sequence.length; i < n; i++) {
    sequence.push(sequence[i - 1]! + sequence[i - 2]!);
  }
  return sequence;
};

/** Fast Doubling method
 * Time Complexity: O(log n)
 * Space Complexity: O(log n)
 */
export function fib(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError("n must be a non-negative integer");
  }
  if (n <= 1) return n;
  return fibPair(n)[0];
}

function fibPair(n: number): [number, number] {
  if (n === 0) return [0, 1];
  const [a, b] = fibPair(Math.floor(n / 2));
  const c = a * (2 * b - a); // F(2k)
  const d = a * a + b * b; // F(2k + 1)
  return n % 2 === 0 ? [c, d] : [d, c + d];
}

/** * Example Algorithm: Fibonacci Sequence
 * Time Complexity: O(2^n) - Exponential (bad)
 * Space Complexity: O(n)
 */
function fibbonacciRecursive(n: number): number {
  if (n < 2) return n;
  return fibbonacciRecursive(n - 1) + fibbonacciRecursive(n - 2);
}

function fibbonacciTotal(n: number): number {
  return fibbonacci(n).reduce((acc, val) => acc + val, 0);
}

function getFibbonacciItem(n: number, position?: number): number {
  const sequence = fibbonacci(n);
  const pos = position ?? sequence.length - 1;
  const item = sequence[pos];
  return item ? item : -1;
}

console.log(fibbonacci(10)); // => [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
console.log(getFibbonacciItem(10, 5)); // => 5
console.log(getFibbonacciItem(10)); // => 34
console.log(fibbonacciTotal(10)); // => 88

export { fibbonacci, fibbonacciRecursive, fibbonacciTotal, getFibbonacciItem };
