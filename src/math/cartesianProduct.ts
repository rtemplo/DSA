/**
 * CARTESIAN PRODUCT ALGORITHM
 *
 * The Cartesian Product is a mathematical operation that returns a set of all possible
 * ordered pairs (or tuples) from two or more sets. For example, the Cartesian Product
 * of sets A = {1, 2} and B = {x, y} is {(1,x), (1,y), (2,x), (2,y)}.
 *
 * This algorithm takes multiple arrays and generates all possible combinations where
 * each combination contains exactly one element from each input array, preserving order.
 *
 * Use cases:
 * - Generating all possible configurations or permutations
 * - Creating test case combinations
 * - Product variant generation (e.g., size × color × style in e-commerce)
 * - Database cross joins
 */

/** *Cartesian Product of multiple arrays
 * Time Complexity: O(n^k) where n is the average length of the arrays and k is the number of arrays
 * Space Complexity: O(n^k) for the result storage
 */
const cartesianProduct = <T>(arrays: T[][]): T[][] => {
  return arrays.reduce<T[][]>(
    (acc, curr) => {
      const result: T[][] = [];
      acc.forEach((a) => {
        curr.forEach((b) => {
          result.push([...a, b]);
        });
      });
      return result;
    },
    [[]]
  );
};

/** *Cartesian Product limited to two arrays
 * Time Complexity: O(n*m) where n and m are the lengths of the two arrays
 * Space Complexity: O(n*m) for the result storage
 */
const simpleCartesianProduct = <T>(arr1: T[], arr2: T[]): T[][] => {
  const result: T[][] = [];

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      result.push([arr1[i]!, arr2[j]!]);
    }
  }

  return result;
};

const product = cartesianProduct([
  [1, 2],
  [3, 4],
  [5, 6],
]); // Example usage
console.log(product); // Outputs the Cartesian product

export { cartesianProduct, simpleCartesianProduct };
