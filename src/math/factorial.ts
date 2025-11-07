/**
 * Calculates the factorial of a given number.
 * Time Complexity: O(n) - Linear (good)
 * Space Complexity: O(n)
 */
function factorial(n: number): number {
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers");
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

export { factorial };

// Example usage and testing
console.log(factorial(5)); // Output: 120
console.log(factorial(0)); // Output: 1
console.log(factorial(1)); // Output: 1
