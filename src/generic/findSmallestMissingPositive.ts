export function findSmallestMissingPositive(orderNumbers: number[]): number {
  let i = 0;
  // If array is empty default to 1, otherwise default to length + 1 if all positives are present
  let smallestMissingPositive =
    orderNumbers.length > 0 ? orderNumbers[orderNumbers.length - 1]! + 1 : 1;

  while (i < orderNumbers.length) {
    const num = orderNumbers[i]! || -1;
    const numAtTarget = orderNumbers[num - 1];

    if (num === i + 1 || num <= 0) {
      i++;
    } else {
      const hold = numAtTarget ?? -1;
      orderNumbers[num - 1] = num;
      orderNumbers[i] = hold === num ? -1 : hold;
    }
  }

  for (let i = 0; i <= orderNumbers.length; i++) {
    const num = orderNumbers[i]!;
    if (num < 0) {
      smallestMissingPositive = i + 1;
      break;
    }
  }
  console.log("Reordered Array:", orderNumbers);
  return smallestMissingPositive;
}

const arr: number[] = [3, 4, -1, 1];
console.log("Smallest Missing Positive is:", findSmallestMissingPositive(arr));
