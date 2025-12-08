function twoSum(numbers: number[], target: number): [number, number] | null {
  // Approach 1: Build the entire map first
  const map = numbers.reduce((acc, num, index) => {
    acc.set(num, index);
    return acc;
  }, new Map<number, number>());

  // Then search through the map
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i]!;
    const complement = target - num;

    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
  }

  return null; // No solution found
}

// Approach 2: More efficient single-pass approach
function twoSumSinglePass(numbers: number[], target: number): [number, number] | null {
  const map = new Map<number, number>();

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i]!;
    const complement = target - num;

    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }

    map.set(num, i);
  }

  return null; // No solution found
}

const sampleNumbers = [2, 7, 11, 15];
console.log("Using reduce to build map:", twoSum(sampleNumbers, 9));
console.log("Single pass approach:", twoSumSinglePass(sampleNumbers, 9));

export { twoSum, twoSumSinglePass };
