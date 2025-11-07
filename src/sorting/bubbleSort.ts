/** *Bubble Sort Algorithm Implementation*
 * Time Complexity: O(n^2) - Quadratic (bad)
 * Space Complexity: O(1)
 */
function bubbleSort(arr: number[]): number[] {
  let swapped = true;
  let temp: number;

  if (arr.length <= 1) return arr;

  do {
    swapped = false;

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i]! > arr[i + 1]!) {
        temp = arr[i]!;
        arr[i] = arr[i + 1]!;
        arr[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);

  return arr;
}

function testBubbleSort(): void {
  const unsortedArray = [8, 5, 3, 7, 10, 1, 9, 2, 4, 6];
  console.log("Unsorted Array:", unsortedArray);
  const sortedArray = bubbleSort(unsortedArray);
  console.log("Sorted Array:", sortedArray);
}

testBubbleSort();

export { bubbleSort };
