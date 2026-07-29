// Sample data for sorting practice

// 1. Array of numbers
const numbers: number[] = [64, 34, 25, 12, 22, 11, 90, 88, 45, 50];
const sortedNumbers: number[] = [...numbers].sort((a, b) => a - b);
console.log("sortedNumbers: ", sortedNumbers);

// 2. Array of strings
const fruits: string[] = ["banana", "apple", "cherry", "date", "elderberry", "fig"];
const sortedFruits: string[] = [...fruits].sort((a, b) => a.localeCompare(b));
console.log("sortedFruits: ", sortedFruits);

// 3. Array of objects
interface Person {
  name: string;
  age: number;
  salary: number;
  [key: string]: SortableValue;
}

interface SortOrder {
  key: keyof Person;
  dir: "asc" | "desc";
}

const people: Person[] = [
  { name: "Alice", age: 28, salary: 75000 },
  { name: "Bob", age: 35, salary: 85000 },
  { name: "Charlie", age: 26, salary: 55000 },
  { name: "Eve", age: 26, salary: 72000 },
  { name: "Diana", age: 30, salary: 90000 },
];

// const peopleSortedByName: Person[] = [...people].sort((a, b) => a.name.localeCompare(b.name));
// const peopleSortedByAge: Person[] = [...people].sort((a, b) => a.age - b.age);
// const peopleSortedBySalary: Person[] = [...people].sort((a, b) => a.salary - b.salary);

// console.log("peopleSortedByName: ", peopleSortedByName);
// console.log("peopleSortedByAge: ", peopleSortedByAge);
// console.log("peopleSortedBySalary: ", peopleSortedBySalary);

const _sortPeopleByKey = (people: Person[], key: keyof Person): Person[] => {
  return [...people].sort((a, b) => {
    if (typeof a[key] === "string" && typeof b[key] === "string") {
      return (a[key] as string).localeCompare(b[key] as string);
    } else if (typeof a[key] === "number" && typeof b[key] === "number") {
      return (a[key] as number) - (b[key] as number);
    } else {
      return 0;
    }
  });
};

// console.log("sortPeopleByKey (name): ", sortPeopleByKey(people, "name"));
// console.log("sortPeopleByKey (age): ", sortPeopleByKey(people, "age"));
// console.log("sortPeopleByKey (salary): ", sortPeopleByKey(people, "salary"));

type SortableValue = string | number | boolean | bigint | Date;

const isSortable = (val: unknown): val is SortableValue => {
  const type = typeof val;
  return (
    type === "string" ||
    type === "number" ||
    type === "boolean" ||
    type === "bigint" ||
    val instanceof Date
  );
};

function compareValues<T extends SortableValue>(a: T, b: T, dir: "asc" | "desc" = "asc"): number {
  if (!isSortable(a) || !isSortable(b)) {
    return 0;
  }

  let cmp: number;
  if (a instanceof Date && b instanceof Date) {
    cmp = a.getTime() - b.getTime();
  } else if (typeof a === "bigint" && typeof b === "bigint") {
    cmp = a > b ? 1 : a < b ? -1 : 0;
  } else if (typeof a === "boolean" && typeof b === "boolean") {
    cmp = Number(a) - Number(b);
  } else if (typeof a === "string" && typeof b === "string") {
    cmp = a.localeCompare(b);
  } else {
    cmp = (a as number) - (b as number);
  }

  return dir === "desc" ? -cmp : cmp;
}

const sortByMultipleKeys = <T extends Record<string, SortableValue>>(
  dataArray: T[],
  sortOrder: { key: keyof T; dir: "asc" | "desc" }[]
): T[] => {
  return [...dataArray].sort((a, b) => {
    for (const { key, dir } of sortOrder) {
      const cmp = compareValues(a[key], b[key], dir);
      if (cmp !== 0) return cmp;
    }
    return 0;
  });
};

console.log(
  "sortPeopleByName (asc): ",
  [...people].sort((a, b) => compareValues(a.name, b.name, "asc"))
);
console.log(
  "sortPeopleByAge (asc): ",
  [...people].sort((a, b) => compareValues(a.age, b.age, "asc"))
);
console.log(
  "sortPeopleBySalary (asc): ",
  [...people].sort((a, b) => compareValues(a.salary, b.salary, "asc"))
);

console.log(
  "sortPeopleByName (desc): ",
  [...people].sort((a, b) => compareValues(a.name, b.name, "desc"))
);
console.log(
  "sortPeopleByAge (desc): ",
  [...people].sort((a, b) => compareValues(a.age, b.age, "desc"))
);
console.log(
  "sortPeopleBySalary (desc): ",
  [...people].sort((a, b) => compareValues(a.salary, b.salary, "desc"))
);

const sortOrder: SortOrder[] = [
  { key: "age", dir: "asc" },
  { key: "salary", dir: "desc" },
];

const sortedByMultipleKeys = [...people].sort((a, b) => {
  for (const { key, dir } of sortOrder) {
    const cmp = compareValues(a[key] as SortableValue, b[key] as SortableValue, dir);
    if (cmp !== 0) return cmp;
  }
  return 0;
});

console.log("sortByMultipleKeys (age asc, salary desc): ", sortByMultipleKeys(people, sortOrder));
console.log(
  "sortedByMultipleKeys (age asc, salary desc) [predicate function]: ",
  sortedByMultipleKeys
);

// 4. Array of tuples (mixed types)
const records: [string, number][] = [
  ["item1", 45],
  ["item2", 12],
  ["item3", 78],
  ["item4", 34],
  ["item5", 56],
];

console.log([...records].sort((a, b) => a[1] - b[1]));

console.log("Finish");

// TODOs: Practice different sorting algorithms
// - Bubble sort
// - Quick sort
// - Merge sort
// - Selection sort
// - Compare sorting with custom comparators
