/**
 * Quick Sort Algorithm
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n)
 */
export function quickSort<T>(arr: T[]): T[] {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)]!; // Non-null assertion since we know array has elements
  const left = arr.filter((x) => x < pivot);
  const middle = arr.filter((x) => x === pivot);
  const right = arr.filter((x) => x > pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
}
