/**
 * Checks if a number is a power of two
 * @param num The number to check
 * @returns True if the number is a power of two, false otherwise
 * Premises:
 * - Powers of two are positive integers (1, 2, 4, 8, 16, ...)
 * - 2^0 = 1, 2^1 = 2, 2^2 = 4, 2^3 = 8, ...
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
function isPowerOfTwo(num: number): boolean {
  if (num <= 0) return false; // Powers of two are positive integers
  /** Bitwise AND trick:
   * A power of two in binary has exactly one '1' bit in its binary form. i.e.
   * 1 = 0001
   * 2 = 0010
   * 4 = 0100
   * 8 = 1000
   * The binary value of the preceding number (subtract 1) will have the bits flipped starting where '1' is. So ...
   * For 4 which is 1100, 4 - 1 = 3 = 0011
   * For 8 which is 1000, 8 - 1 = 7 = 0111
   * So, if num = 8, num & (num - 1) ==> 8 & 7 expressed as
   * 1000 & 0111
   * And the result of a bit by bit 'AND' operation results in 1/true only if they are both 1/true.
   * Therefore 1000 & 0111 = 0000 = 0
   */
  return (num & (num - 1)) === 0;
}

/** *Bonus: Non-optimized version for comparison
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function isPowerOfTwoNonOptimized(num: number): boolean {
  if (num <= 0) return false; // Powers of two are positive integers
  while (num > 1) {
    if (num % 2 !== 0) return false;
    num = num / 2;
  }
  return true;
}

export { isPowerOfTwo, isPowerOfTwoNonOptimized };
