/** *Tower of Hanoi Problem
 * Time Complexity: O(2^n) - Exponential
 * Space Complexity: O(n) - due to recursion stack
 * The Tower of Hanoi is a classic problem that involves moving a set of disks
 * from one peg to another, following specific rules. There are three spindles (pegs)
 * and n disks of different sizes which can slide onto any peg. The puzzle starts
 * with the disks stacked in ascending order of size on one peg, the smallest at the top,
 * thus making a conical shape.
 * Rules:
 * 1. Only one disk can be moved at a time.
 * 2. Each move consists of taking the upper disk from one of the stacks
 *    and placing it on top of another stack or on an empty peg.
 * 3. No larger disk may be placed on top of a smaller disk.
 */
const towerOfHanoi = (n: number, source: string, target: string, auxilary: string): void => {
  const message = `Move disk ${n} from ${source} to ${target}`;

  // Base case: only one disk to move
  if (n === 1) {
    console.log(message);
    return;
  }

  // Move n-1 disks from source to auxilary, using target as auxiliary
  towerOfHanoi(n - 1, source, auxilary, target);

  console.log(message);

  // Move n-1 disks from auxilary to target, using source as auxiliary
  towerOfHanoi(n - 1, auxilary, target, source);
};

towerOfHanoi(3, "A", "C", "B"); // A, B and C are names of rods

export { towerOfHanoi };
