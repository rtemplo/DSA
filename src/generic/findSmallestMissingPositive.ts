export function findSmallestMissingPositive(orderNumbers: number[]): number {
  const n = orderNumbers.length;
  let i = 0;

  // Phase 1: Place each positive integer at its correct index (num at index num-1)
  while (i < n) {
    const currentNum = orderNumbers[i]!;
    const targetIndex = currentNum - 1;

    /**
     * Skip if:
     * - already in correct position
     * - target slot already has the same value as currentNum, meaning currentNum is a duplicate
     * - out of range (negative number or numbers larger than the size of the array)
     *
     * Why we can skip out of range numbers:
     * Because we are only interested in the smallest missing POSITIVE number, we can ignore negative numbers
     * and leave them misaligned.Conversely, we can also ignore numbers larger than the array size, as they
     * cannot be the smallest missing positive within the range 1 to n. These can also be left misaligned.
     *
     * As the loop progresses they will either be corrected by a
     * subsequent swap or left misaligned and eventually be caught in phase 2.
     */
    if (
      currentNum === i + 1 || // already in the correct position
      currentNum <= 0 || // range: ignore non-positive numbers
      currentNum > n || // range: ignore numbers larger than n
      orderNumbers[targetIndex] === currentNum // duplicate check, number has been seen before and is already in its target position
    ) {
      i++;
    } else {
      // Swap current number to its target position
      [orderNumbers[i], orderNumbers[targetIndex]] = [orderNumbers[targetIndex]!, currentNum];
      /* Essentially a mirror swap:
       * [currentNum, orderNumbers[targetIndex]] = [orderNumbers[targetIndex]!, currentNum];
       * But since currentNum is a value and not an assignable array element, we use it's corresponding
       * array element orderNumbers[i] to get [orderNumbers[i], orderNumbers[targetIndex]].
       */
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
