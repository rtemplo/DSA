/** *Insertion Sort
 * Time Complexity: O(n^2) - Quadratic (bad)
 * Space Complexity: O(1)
 */
function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    const numberToInsert = arr[i]!; // 20, 8, -2
    let sortedEntryIndex = i - 1; // 0, 1, 2
  
    while (arr[sortedEntryIndex]! > numberToInsert && sortedEntryIndex >= 0) {
      arr[sortedEntryIndex + 1] = arr[sortedEntryIndex]!;
      sortedEntryIndex--;
    }
    
    arr[sortedEntryIndex + 1] = numberToInsert;
  }
  return arr;
}

function testInsertionSort(): void {
  const sampleArray = [-6, 20, 8, -2, 4];
  console.log("Unsorted Array:", sampleArray);
  const sortedArray = insertionSort(sampleArray);
  console.log("Sorted Array:", sortedArray);
}

testInsertionSort();

export { insertionSort };

