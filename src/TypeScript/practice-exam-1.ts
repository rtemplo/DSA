/**
 * Practice Exam 1
 * Covers regimen modules: 2 (Generics), 4 (Advanced Object Types),
 * 5 (Conditional Types & Inference), 6 (Template Literal Types),
 * 7 (Discriminated Unions & Narrowing).
 * See PRACTICE-REGIMEN.md for the full curriculum.
 *
 * Each question has a stub placeholder so the file compiles as-is.
 * Replace the stub with your solution, then run to check the console output.
 */

// Question 1 (Module 2 — Generics & constraints):
// Write `pluck`, a function that takes an array of objects and a key,
// and returns an array of just that key's values.
// Expected: pluck(users, "name") -> string[]
function pluck<T, K extends keyof T>(_items: T[], _key: K): T[K][] {
  return [];
}

const users = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Grace" },
];
console.log("pluck: ", pluck(users, "name")); // expected: ["Ada", "Grace"]

// Question 2 (Module 4 — Recursive mapped types):
// Write `DeepPartial<T>`, like `Partial<T>` but applied recursively to
// nested objects.
type DeepPartial<T> = T;

interface Settings {
  theme: string;
  notifications: {
    email: boolean;
    sms: boolean;
  };
}

// Should compile: only a subset of nested keys provided.
const partialSettings: DeepPartial<Settings> = {
  notifications: { email: true },
};
console.log("partialSettings: ", partialSettings);

// Question 3 (Module 5 — Conditional types & infer):
// Write `UnwrapPromise<T>` that extracts the resolved type of a Promise,
// or returns T unchanged if it isn't a Promise.
// Expected: UnwrapPromise<Promise<number>> -> number, UnwrapPromise<string> -> string
type UnwrapPromise<T> = T;

export type A = UnwrapPromise<Promise<number>>; // should be number
export type B = UnwrapPromise<string>; // should be string

// Question 4 (Module 6 — Template literal types):
// Write `EventName<T>` that turns a string literal union into
// "on"-prefixed, capitalized event names.
// Expected: EventName<"click" | "hover"> -> "onClick" | "onHover"
type EventName<T extends string> = T;

export type ClickEvents = EventName<"click" | "hover">;

// Question 5 (Module 7 — Discriminated unions & exhaustiveness):
// Complete `area` so it handles every variant of `Shape` and uses a
// `never` check to guarantee exhaustiveness at compile time.
interface Circle {
  kind: "circle";
  radius: number;
}
interface Square {
  kind: "square";
  side: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
type Shape = Circle | Square | Rectangle;

function area(_shape: Shape): number {
  return 0;
}

console.log("area(circle): ", area({ kind: "circle", radius: 2 })); // expected: ~12.57
console.log("area(square): ", area({ kind: "square", side: 4 })); // expected: 16
console.log("area(rectangle): ", area({ kind: "rectangle", width: 3, height: 5 })); // expected: 15

// Question 6 (Module 4 — Utility type composition):
// Write `PartialExcept<T, K>`: every property of T is optional except
// the ones named in K, which stay required.
type PartialExcept<T, _K> = T;

interface Draft {
  id: string;
  title: string;
  body: string;
  tags: string[];
}

// Should compile: only `id` is required, everything else optional.
const draft: PartialExcept<Draft, "id"> = { id: "abc123" };
console.log("draft: ", draft);

// Question 7 (Module 7 — Custom type predicates):
// Write `isString`, a type predicate used to filter an array of unknown
// values down to a string[].
function isString(_value: unknown): _value is string {
  return false;
}

const mixed: unknown[] = ["a", 1, "b", null, "c", undefined];
const strings = mixed.filter(isString);
console.log("strings: ", strings); // expected: ["a", "b", "c"]

console.log("exiting");
