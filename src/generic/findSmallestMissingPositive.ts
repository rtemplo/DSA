export function findSmallestMissingPositive(orderNumbers: number[]): number {
  const n = orderNumbers.length;
  let i = 0;

  // Phase 1: Place each positive integer at its correct index (num at index num-1)
  while (i < n) {
    const currentNum = orderNumbers[i]!;
    const targetIndex = currentNum - 1;

    /**
     * Skip if: already in correct position, out of range, or target slot has same value (duplicate)
     * For out of range numbers and duplicates there is no need to swap. They are left to be currently
     * misaligned to their index position. As the loop progresses they will either be corrected by a
     * subsequent swap or left misaligned and eventually be caught in phase 2.
     */
    if (
      currentNum <= 0 || // range: ignore non-positive numbers
      currentNum > n || // range: ignore numbers larger than n
      currentNum === i + 1 || // already in the correct position
      orderNumbers[targetIndex] === currentNum // duplicate check, number has been seen before and is already in its target position
    ) {
      i++;
    } else {
      // Swap current number to its target position
      [orderNumbers[i], orderNumbers[targetIndex]] = [orderNumbers[targetIndex]!, currentNum];
    }
  }

  // Phase 2: Find first index where value doesn't match position
  for (let i = 0; i < n; i++) {
    if (orderNumbers[i] !== i + 1) {
      return i + 1;
    }
  }

  /**
   * Default: If no return is made in phase 2 it means all positions 1 to n are filled correctly
   * hence the smallest missing positive is the next number in the sequence, which is n + 1.
   */
  return n + 1;
}

const arr: number[] = [3, 4, -1, 1];
console.log("Smallest Missing Positive is:", findSmallestMissingPositive(arr));
