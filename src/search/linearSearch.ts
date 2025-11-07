/** * Liner Search Algorith
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function linearSearch(arr: number[], target: number) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

export { linearSearch };
