/** * Checks if a number is prime
 * @param num The number to check for primality
 * @returns True if the number is prime, false otherwise
 * Time Complexity: O(√n)
 * Space Complexity: O(1)
 */
function isPrimeNumber(num: number): boolean {
  // primes must be positive and not 1
  if (num <= 1) return false;
  /* * 2 and 3 are immediately qualified as prime
   * 2 is the only even prime and can be singled out as such,
   * 3 having no lower numbers to qualify as potential factors can also be singled out.
   */
  if (num === 2 || num === 3) return true;
  // exclude all other even numbers
  if (num % 2 === 0) return false;

  /** * Mathematical principle as optimization technique:
   * If n = a × b, then one of a or b must be less than or equal to the square root of n.
   *
   * Rather than implement i <= Math.sqrt(num) (which involves floating point operations),
   * we use i^2 = num, that is, i * i <= num (which uses basic integersand thus faster).
   */
  for (let i = 3; i * i <= num; i += 2) {
    if (num % i === 0) return false;
  }

  return true;
}

// Example usage and testing
function testIsPrimeNumber(): void {
  const testNumbers = [1, 2, 3, 4, 5, 16, 17, 18, 19, 20, 23, 24, 25, 29];

  testNumbers.forEach((num) => {
    console.log(`${num} is prime? ${isPrimeNumber(num)}`);
  });
}

testIsPrimeNumber();

export { isPrimeNumber };
