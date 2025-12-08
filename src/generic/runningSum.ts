/**
 * This file is more generically named runningSum.ts but the function is more
 * specifically named for a task it might be used for 'countResponseTimeRegressions'.
 *
 * Implementation:
 * Given an array of numbers, count the number of elements that are greater
 * than the running average of all previous elements including itself.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

export function countResponseTimeRegressions(responseTimes: number[]): number {
  let count = 0;
  let runningSum = 0;

  for (let i = 0; i < responseTimes.length; i++) {
    runningSum += responseTimes[i]!;
    const average = runningSum / (i + 1);
    if (responseTimes[i]! > average) {
      count++;
    }
  }

  return count;
}
