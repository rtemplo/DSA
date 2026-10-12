// Sorting Logic

const people = [
  { name: "Alice", age: 28, salary: 75000 },
  { name: "Bob", age: 35, salary: 85000 },
  { name: "Charlie", age: 26, salary: 55000 },
  { name: "Eve", age: 26, salary: 72000 },
  { name: "Diana", age: 30, salary: 90000 },
];

interface SortOrder<T> {
  key: keyof T;
  dir: "asc" | "desc";
}

type SortableValue = string | number | boolean | bigint | Date;

function compareValues<T extends SortableValue>(a: T, b: T, dir: "asc" | "desc" = "asc"): number {
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
  sortOrder: SortOrder<T>[]
): T[] => {
  return [...dataArray].sort((a, b) => {
    for (const { key, dir } of sortOrder) {
      const cmp = compareValues(a[key], b[key], dir);
      if (cmp !== 0) return cmp;
    }
    return 0;
  });
};

const sortOrder: SortOrder<(typeof people)[number]>[] = [
  { key: "age", dir: "asc" },
  { key: "salary", dir: "desc" },
];

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
  [...people].sort((a, b) => compareValues(a.salary, b.salary, "desc"))
);

console.log("sortByMultipleKeys (age asc, salary desc): ", sortByMultipleKeys(people, sortOrder));

console.log("Finish");
