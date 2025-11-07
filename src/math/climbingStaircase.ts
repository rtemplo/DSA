/** Simple Climbing Staircase - Problem*
 * You are climbing a staircase with n steps. Step sizes are 1 or 2 steps.
 * Time Complexity: O(n) - Linear (good)
 * Space Complexity: O(n)
 * This demonstrates that the solution is underpinned by the Fibonacci sequence.
 */
const simpleClimbingStaircase = (n: number): number => {
  const numberOfWays: number[] = [1, 2];
  for (let i = 2; i < n; i++) {
    numberOfWays[i] = numberOfWays[i - 1]! + numberOfWays[i - 2]!;
  }
  return numberOfWays[n - 1]!;
};

/** *Variable Steps Climbing Staircase - Problem*
 * You are climbing a staircase. It takes n steps to reach the top.
 * Flexible implementation that works with any combination of step sizes.
 * Define possible step increments - easily configurable!
 * [1,2] = can take 1 or 2 steps at a time
 * [1,2,3] = can take 1, 2, or 3 steps at a time
 * [1,3,5] = can take 1, 3, or 5 steps at a time, etc.
 *
 * Time Complexity: O(n * k) where k is number of different step sizes
 * Space Complexity: O(n)
 */
const climbingStaircase = (n: number, stepIncrement: number[]): number => {
  // Handle edge case - conceptually 0 ways to stay at ground
  if (n <= 0) return 0;

  // Initialize dp array where dp[i] = number of ways to reach step i
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1; // Mathematical base case: 1 way to "do nothing" (enables DP recurrence)

  // Handle the conceptual preference: if asking for ground level, return 0
  // But we still need dp[0] = 1 internally for the algorithm to work correctly

  // Generalized step aggregation function
  const stepAggregation = (i: number): number => {
    return stepIncrement.reduce((acc, stepSize) => {
      // Only add if we can take that step (i.e., previous position exists and is valid)
      if (i - stepSize >= 0) {
        return acc + dp[i - stepSize]!;
      }
      return acc;
    }, 0);
  };

  // Build up the solution for each step
  for (let i = 1; i <= n; i++) {
    dp[i] = stepAggregation(i);
  }

  return dp[n]!;
};

const stepIncrement: number[] = [1, 2, 3];

console.log(`n=0: ${climbingStaircase(0, stepIncrement)}`); // Edge case: 0 steps to climb
console.log(`n=1: ${climbingStaircase(1, stepIncrement)}`); // 1 way: 1
console.log(`n=2: ${climbingStaircase(2, stepIncrement)}`); // 2 ways: 1,1 || 2
console.log(`n=3: ${climbingStaircase(3, stepIncrement)}`); // 4 ways: 1,1,1 || 1,2 || 2,1 || 3
console.log(`n=4: ${climbingStaircase(4, stepIncrement)}`); // 8 ways: 1,1,1,1 || 1,1,2 || 1,2,1 || 2,1,1 || 2,2 || 1,3 || 3,1
console.log(`n=5: ${climbingStaircase(5, stepIncrement)}`); // 16 ways: 1,1,1,1,1 || 1,1,1,2 || 1,1,2,1 || 1,2,1,1 || 2,1,1,1 || 2,2,1 || 2,1,2 || 1,3,1 || 1,1,3 || 3,1,1 || 1,2,2 || 2,2,1 || 3,2 || 2,3

export { climbingStaircase, simpleClimbingStaircase };
