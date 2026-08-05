/**
 * Practice Exam 4
 * Covers regimen modules:
 * 1 (Fundamentals),
 * 3 (Objects/Arrays/Tuples),
 * 5 (Conditional Types & Inference),
 * 7 (Discriminated Unions & Narrowing),
 * 8 (Classes & OOP),
 * 10 (Advanced/Type-level Programming).
 * See PRACTICE-REGIMEN.md for the full curriculum.
 *
 * Each question has a stub placeholder so the file compiles as-is.
 * Replace the stub with your solution, then run to check the console output.
 */

// Question 1 (Module 1 — Union literals & control flow):
// Write `nextStatus`, which cycles a `Status` literal to the next one in
// order: "pending" -> "active" -> "done" -> "pending".
// Expected: nextStatus("pending") -> "active", nextStatus("done") -> "pending"
type Status = "pending" | "active" | "done";

function nextStatus(status: Status): Status {
  switch (status) {
    case "pending":
      return "active";
    case "active":
      return "done";
    case "done":
      return "pending";
  }
}

console.log("nextStatus('pending'): ", nextStatus("pending")); // expected: "active"
console.log("nextStatus('active'): ", nextStatus("active")); // expected: "done"
console.log("nextStatus('done'): ", nextStatus("done")); // expected: "pending"

// Question 2 (Module 3 — Variadic tuple types):
// Write `concatTuples`, which concatenates two tuples into one, preserving
// each element's type and position via variadic tuple types.
// Expected: concatTuples([1, "a"], [true]) -> [1, "a", true]
function concatTuples<A extends unknown[], B extends unknown[]>(
  a: [...A],
  b: [...B]
): [...A, ...B] {
  return [...a, ...b] as unknown as [...A, ...B];
}

console.log("concatTuples: ", concatTuples([1, "a"], [true]));

// Question 3 (Module 5 — `infer` & custom utility types):
// Write `MyReturnType<T>`, a from-scratch version of the built-in
// `ReturnType<T>`, using `infer` to extract a function's return type.
// Expected: MyReturnType<() => string> -> string
type MyReturnType<T> = T extends (...args: never[]) => infer R ? R : never;

function greet(): string {
  return "hi";
}
export type Greeting = MyReturnType<typeof greet>; // should be string

// Question 4 (Module 7 — Discriminated unions & exhaustiveness):
// Complete `describe` so it handles every variant of `NetworkState` and
// uses a `never` check to guarantee exhaustiveness at compile time.
interface Loading {
  status: "loading";
}
interface Errored {
  status: "error";
  message: string;
}
interface Success {
  status: "success";
  data: string;
}
type NetworkState = Loading | Errored | Success;

function assertNever(x: never): never {
  throw new Error(`Unexpected shape: ${JSON.stringify(x)}`);
}

function describe(state: NetworkState): string {
  switch (state.status) {
    case "loading":
      return "loading...";
    case "error":
      return `error: ${state.message}`;
    case "success":
      return `success: ${state.data}`;
    default:
      return assertNever(state);
  }
}

console.log("describe(loading): ", describe({ status: "loading" })); // expected: "loading..."
console.log("describe(error): ", describe({ status: "error", message: "timeout" })); // expected: "error: timeout"
console.log("describe(success): ", describe({ status: "success", data: "42" })); // expected: "success: 42"

// Question 5 (Module 8 — Generics in classes):
// `push` is done; implement `pop` (removes & returns the top item, or
// `undefined` if empty), `peek` (same but without removing), and `isEmpty`.
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log("peek: ", stack.peek()); // expected: 2
console.log("pop: ", stack.pop()); // expected: 2
console.log("isEmpty: ", stack.isEmpty()); // expected: false

// Question 6 (Module 10 — Branded/nominal types):
// Write a branded `UserId` type (a `string` tagged so it can't be mixed up
// with a plain `string`), plus `createUserId` to construct one.
// Expected: createUserId("u1") -> a UserId
type UserId = string & { __brand: "UserId" };

function createUserId(id: string): UserId {
  return id as UserId;
}

const userId: UserId = createUserId("u1");
console.log("userId: ", userId);
// Once branded, this line should become a compile error:
// const notAUserId: UserId = "raw-string";

console.log("exiting");
