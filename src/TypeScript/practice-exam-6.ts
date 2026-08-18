/**
 * Practice Exam 6
 * Covers regimen modules:
 * 2 (Functions & Generics),
 * 3 (Objects/Arrays/Tuples),
 * 4 (Advanced Object Types),
 * 5 (Conditional Types & Inference),
 * 7 (Discriminated Unions & Narrowing),
 * 8 (Classes & OOP),
 * 10 (Advanced/Type-level Programming).
 * See PRACTICE-REGIMEN.md for the full curriculum.
 *
 * Each question has a stub placeholder so the file compiles as-is.
 * Replace the stub with your solution, then run to check the console output.
 */

// Question 1 (Module 2 — Function overloads):
// Write overload signatures for `combine` so it sums two numbers or
// concatenates two strings, then a single implementation that satisfies both.
// Expected: combine(1, 2) -> 3, combine("a", "b") -> "ab"
function combine(_a: unknown, _b: unknown): unknown {
  return undefined;
}

console.log("combine(1, 2): ", combine(1, 2)); // expected: 3
console.log("combine('a', 'b'): ", combine("a", "b")); // expected: "ab"

// Question 2 (Module 3 — Labeled tuple types):
// Write `Pair<T, U>`, a labeled tuple `[first: T, second: U]`, and
// `swapPair`, which swaps the two elements.
// Expected: swapPair([1, "a"]) -> ["a", 1]
type Pair<T, U> = [T, U];

function swapPair<T, U>(pair: Pair<T, U>): Pair<U, T> {
  return pair as unknown as Pair<U, T>;
}

console.log("swapPair([1, 'a']): ", swapPair([1, "a"]));

// Question 3 (Module 4 — `Omit`):
// Write `PublicUser`, which strips `password` from `User`, and
// `toPublicUser`, which produces one from a `User` at runtime too.
// Expected: toPublicUser(user) -> { id: "u1", name: "Ada" }
interface User {
  id: string;
  name: string;
  password: string;
}

type PublicUser = User;

function toPublicUser(user: User): PublicUser {
  return user;
}

const user: User = { id: "u1", name: "Ada", password: "secret" };
console.log("toPublicUser(user): ", toPublicUser(user));

// Question 4 (Module 5 — `infer`):
// Write `UnwrapPromise<T>`, which extracts the resolved type from a
// `Promise<T>` (and passes non-Promise types through unchanged).
// Expected: UnwrapPromise<Promise<number>> -> number
type UnwrapPromise<T> = T;

async function fetchValue(): Promise<number> {
  return 42;
}
export type FetchedValue = UnwrapPromise<ReturnType<typeof fetchValue>>; // should be number

// Question 5 (Module 7 — Discriminated unions & exhaustiveness):
// Complete `area` so it handles every variant of `Shape` and uses a
// `never` check to guarantee exhaustiveness at compile time.
// Expected: area(circle r=2) ~ 12.57, area(square s=3) -> 9, area(rect 2x5) -> 10
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

console.log("area(circle r=2): ", area({ kind: "circle", radius: 2 }));
console.log("area(square s=3): ", area({ kind: "square", side: 3 })); // expected: 9
console.log("area(rect 2x5): ", area({ kind: "rectangle", width: 2, height: 5 })); // expected: 10

// Question 6 (Module 8 — Abstract classes):
// Implement `Car` and `Truck` as subclasses of abstract `Vehicle`, each
// providing `fuelCost(distanceKm)` based on their own `litersPer100km`.
// Expected: new Car(6).fuelCost(100) -> 6, new Truck(20).fuelCost(50) -> 10
abstract class Vehicle {
  abstract fuelCost(distanceKm: number): number;
}

class Car extends Vehicle {
  constructor(private litersPer100km: number) {
    super();
  }

  fuelCost(_distanceKm: number): number {
    return this.litersPer100km * 0;
  }
}

class Truck extends Vehicle {
  constructor(private litersPer100km: number) {
    super();
  }

  fuelCost(_distanceKm: number): number {
    return this.litersPer100km * 0;
  }
}

console.log("new Car(6).fuelCost(100): ", new Car(6).fuelCost(100)); // expected: 6
console.log("new Truck(20).fuelCost(50): ", new Truck(20).fuelCost(50)); // expected: 10

// Question 7 (Module 10 — Tuple-to-union):
// Write `TupleToUnion<T>`, which turns a tuple type into a union of its
// element types.
// Expected: TupleToUnion<[1, "a", true]> -> 1 | "a" | true
type TupleToUnion<T extends readonly unknown[]> = T;

export type Sample = TupleToUnion<[1, "a", true]>; // should be 1 | "a" | true

console.log("exiting");
