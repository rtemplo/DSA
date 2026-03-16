function splitUniqueAndDuplicates(nums: number[]): { uniques: number[]; duplicates: number[] } {
  const counts = new Map<number, number>();
  for (const n of nums) counts.set(n, (counts.get(n) ?? 0) + 1);

  const uniques: number[] = [];
  const duplicates: number[] = [];

  for (const [n, c] of counts) {
    if (c === 1) uniques.push(n);
    else duplicates.push(n);
  }

  return { uniques, duplicates };
}

// Example
const arr: number[] = [4, 7, 4, 2, 9, 2, 2, 5];
// console.log(splitUniqueAndDuplicates(arr));

const sortUniquesVsDupes = (numbers: number[]): { unique: number[]; dupes: number[] } => {
  const counts = new Map<number, number>();
  for (const n of numbers) counts.set(n, (counts.get(n) ?? 0) + 1);

  const unique: number[] = [];
  const dupes: number[] = [];

  for (const [n, c] of counts) {
    if (c === 1) unique.push(n);
    else dupes.push(n);
  }

  return { unique, dupes };
};

console.log(sortUniquesVsDupes(arr));
