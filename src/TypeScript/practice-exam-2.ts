/**
 * Practice Exam 2
 * Covers regimen modules:
 * 1 (Fundamentals),
 * 3 (Objects/Arrays/Tuples),
 * 7 (Discriminated Unions & Narrowing — refresher), 8 (Classes & OOP),
 * 9 (Modules & Declaration Files), 10 (Advanced/Type-level Programming).
 * See PRACTICE-REGIMEN.md for the full curriculum.
 *
 * Each question has a stub placeholder so the file compiles as-is.
 * Replace the stub with your solution, then run to check the console output.
 */

// Question 1 (Module 1 — `as const` & literal unions):
// Derive a `Role` union type from the `roles` tuple below instead of
// hand-writing the literals — use `typeof` + indexed access.
// Expected: Role -> "admin" | "editor" | "viewer"
const roles = ["admin", "editor", "viewer"] as const;
type Role = string;

console.log("roles: ", roles);
const currentRole: Role = "editor";
console.log("currentRole: ", currentRole);

// Question 2 (Module 3 — Tuples):
// Write `zip`, which pairs up two arrays into an array of `[T, U]` tuples,
// stopping at the shorter array's length.
// Expected: zip([1,2,3], ["a","b","c"]) -> [[1,"a"],[2,"b"],[3,"c"]]
function zip<T, U>(_a: T[], _b: U[]): [T, U][] {
  return [];
}
console.log("zip: ", zip([1, 2, 3], ["a", "b", "c"]));

// Question 3 (Module 3 — `readonly` arrays):
// Write `sortedCopy`, which takes a `readonly T[]` (so it can't mutate the
// input) and a comparator, and returns a *new* sorted array.
// Expected: sortedCopy([3,1,2], (a,b) => a - b) -> [1,2,3]
function sortedCopy<T>(_items: readonly T[], _compare: (a: T, b: T) => number): T[] {
  return [];
}
console.log(
  "sortedCopy: ",
  sortedCopy([3, 1, 2], (a, b) => a - b)
);

// Question 4 (Module 8 — Abstract classes & generics):
// Implement `InMemoryRepository<T>` so `findById` actually looks up items
// added via `add` (keyed by `item.id`).
abstract class Repository<T> {
  abstract findById(id: string): T | undefined;
}

interface User {
  id: string;
  name: string;
}

class InMemoryRepository<T extends { id: string }> extends Repository<T> {
  private items = new Map<string, T>();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  override findById(_id: string): T | undefined {
    return undefined;
  }
}

const repo = new InMemoryRepository<User>();
repo.add({ id: "u1", name: "Ada" });
console.log("findById: ", repo.findById("u1")); // expected: { id: "u1", name: "Ada" }

// Question 5 (Module 9 — Declaration merging):
// Merge a `namespace` with `createId` below so that `createId.count`
// tracks how many ids have been generated (function + namespace merging).
function createId(prefix: string): string {
  return `${prefix}-id`;
}

console.log("createId: ", createId("user")); // expected: "user-id"
// Once merged, also try: console.log("createId.count: ", createId.count);

// Question 6 (Module 10 — Tuple-to-union):
// Write `TupleToUnion<T>` that turns a readonly tuple's element types into
// a union.
// Expected: TupleToUnion<typeof rgb> -> "red" | "green" | "blue"
type TupleToUnion<_T extends readonly unknown[]> = unknown;

const rgb = ["red", "green", "blue"] as const;
export type Rgb = TupleToUnion<typeof rgb>;

// Question 7 (Module 10 — Recursive readonly):
// Write `DeepReadonly<T>`, like `Readonly<T>` but applied recursively to
// nested objects, so nested properties can't be reassigned either.
type DeepReadonly<T> = T;

interface Config {
  debug: boolean;
  server: {
    port: number;
    host: string;
  };
}

const config: DeepReadonly<Config> = {
  debug: false,
  server: { port: 8080, host: "localhost" },
};
console.log("config: ", config);
// Once implemented, this line should become a compile error:
// config.server.port = 9090;

// Question 8 (Module 7 — Narrowing with `in`, refresher):
// Complete `move` so it calls `fly()` on a Bird and `swim()` on a Fish,
// narrowing with the `in` operator (there's no shared discriminant field).
interface Bird {
  fly(): void;
}
interface Fish {
  swim(): void;
}

function move(_animal: Bird | Fish): void {
  // TODO
}

const bird: Bird = { fly: () => console.log("flying") };
const fish: Fish = { swim: () => console.log("swimming") };
move(bird); // expected: "flying"
move(fish); // expected: "swimming"

console.log("exiting");
