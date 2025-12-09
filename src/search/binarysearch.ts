/**
 * Example Algorithm: Binary Search
 *
 * Premise:
 * The search algorithm assumes that the array to search is already sorted
 * in ascending order.
 *
 * Implementation:
 * This is a divide-and-conquer algorithm that uses the two-pointer mechanism.
 * It iteratively divides the search interval in half to continually narrow the search space.
 * If the value of the search key is less than the item in the middle of the interval,
 * narrow the interval to the lower half. Otherwise, narrow it to the upper half.
 * Repeatedly check until the value is found or the interval is empty.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1) for iterative, O(log n) for recursive version
 */

function binarySearch<T>(arr: T[], target: T): number {
  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (leftIndex <= rightIndex) {
    const mid = Math.floor((leftIndex + rightIndex) / 2);
    const currentValue = arr[mid];

    if (currentValue === target) {
      return mid;
    } else if (currentValue! < target) {
      leftIndex = mid + 1;
    } else {
      rightIndex = mid - 1;
    }
  }
  return -1; // Element not found
}

function recursiveBinarySearch<T>(
  arr: T[],
  target: T,
  leftIndex: number = 0,
  rightIndex: number = arr.length - 1
): number {
  // Base case: element not found
  if (leftIndex > rightIndex) {
    return -1;
  }

  const mid = Math.floor((leftIndex + rightIndex) / 2);
  const currentValue = arr[mid];

  if (currentValue === target) {
    return mid;
  } else if (currentValue! < target) {
    return recursiveBinarySearch(arr, target, mid + 1, rightIndex);
  } else {
    return recursiveBinarySearch(arr, target, leftIndex, mid - 1);
  }
}

// This is a variant of Binary Search that finds the first occurrence of a target value
// Duplicates may exist in the array
function findFirstOccurrence(nums: number[], target: number): number {
  let leftIndex: number = 0;
  let rightIndex: number = nums.length - 1;
  let foundIndex: number = -1;

  while (leftIndex <= rightIndex) {
    const mid = Math.floor((leftIndex + rightIndex) / 2);
    const currentValue = nums[mid]!;

    if (currentValue === target) {
      foundIndex = mid;
    }

    if (currentValue < target) {
      leftIndex = mid + 1;
    } else {
      rightIndex = mid - 1;
    }
  }

  return foundIndex; // target not found
}

// Example usage and testing
export function testBinarySearch(): void {
  const numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const target = 19;

  const result = binarySearch(numbers, target);

  if (result !== -1) {
    console.log(`✅ Found ${target} at index ${result}`);
  } else {
    console.log(`❌ ${target} not found in the array`);
  }

  // Test with string array
  const words = ["apple", "banana", "cherry", "date", "elderberry"];
  const wordTarget = "cherry";
  const wordResult = binarySearch(words, wordTarget);

  console.log(`String search result: ${wordTarget} found at index ${wordResult}`);
}

// Export for potential use in other files
export { binarySearch, findFirstOccurrence, recursiveBinarySearch };

// Run the test if this is the main module
// if (require.main === module) {
// console.log("🚀 Testing TypeScript setup with Binary Search algorithm");
// testBinarySearch();
const firstOccurrence = findFirstOccurrence([1, 2, 2, 2, 3, 5, 7, 7, 7, 7, 8, 8, 10], 10);
console.log(`First occurrence is at index ${firstOccurrence}`);
// }
