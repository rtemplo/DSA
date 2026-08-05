/**
 * Practice Exam 3
 * Covers regimen modules:
 * 2 (Functions & Generics),
 * 4 (Advanced Object Types),
 * 5 (Conditional Types & Inference),
 * 6 (Template Literal Types),
 * 8 (Classes & OOP), 9 (Modules & Declaration Files).
 * See PRACTICE-REGIMEN.md for the full curriculum.
 *
 * Each question has a stub placeholder so the file compiles as-is.
 * Replace the stub with your solution, then run to check the console output.
 */

// Question 1 (Module 2 — Function overloads):
// Write overload signatures for `parseValue` so it converts a string to a
// number, and a number to a string, then implement it.
// Expected: parseValue("42") -> 42, parseValue(42) -> "42"
function parseValue(_input: string | number): string | number {
  return "";
}

console.log("parseValue('42'): ", parseValue("42")); // expected: 42
console.log("parseValue(42): ", parseValue(42)); // expected: "42"

// Question 2 (Module 4 — Mapped types):
// Write `Nullable<T>`, a mapped type that makes every property of T
// allow `null` in addition to its original type.
// Expected: Nullable<{ name: string }> -> { name: string | null }
type Nullable<T> = T;

const nullableUser: Nullable<{ name: string; age: number }> = {
  name: "Ada",
  age: 30,
};
console.log("nullableUser: ", nullableUser);

// Question 3 (Module 4 — Utility type composition):
// Write `Merge<A, B>` which combines two object types, where B's
// properties override A's on conflicting keys.
// Expected: Merge<{ a: string; b: number }, { b: string; c: boolean }>
//   -> { a: string; b: string; c: boolean }
type Merge<A, B> = A & B;

const merged: Merge<{ a: string; b: number }, { b: string; c: boolean }> = {
  a: "hi",
  b: "overridden",
  c: true,
};
console.log("merged: ", merged);

// Question 4 (Module 5 — Conditional types & `infer`):
// Write `ElementType<T>` that extracts an array's element type via
// `infer`, or returns T unchanged if it isn't an array.
// Expected: ElementType<string[]> -> string, ElementType<number> -> number
type ElementType<T> = T;

export type StringElement = ElementType<string[]>; // should be string
export type NumberElement = ElementType<number>; // should be number

// Question 5 (Module 6 — Template literal types):
// Write `CssVariable<T>` that prefixes each string literal in the union
// with "--".
// Expected: CssVariable<"primary" | "secondary"> -> "--primary" | "--secondary"
type CssVariable<T extends string> = T;

export type ThemeVariable = CssVariable<"primary" | "secondary">;

// Question 6 (Module 8 — Interfaces & access modifiers):
// Implement `BankAccount` so `deposit` increases the private balance and
// `withdraw` returns false (without changing the balance) when the
// requested amount exceeds it, true otherwise.
interface Account {
  readonly balance: number;
  deposit(amount: number): void;
  withdraw(amount: number): boolean;
}

class BankAccount implements Account {
  private _balance: number;

  constructor(openingBalance: number) {
    this._balance = openingBalance;
  }

  get balance(): number {
    return this._balance;
  }

  deposit(_amount: number): void {
    // TODO
  }

  withdraw(_amount: number): boolean {
    return false;
  }
}

const account = new BankAccount(100);
account.deposit(50);
console.log("balance after deposit: ", account.balance); // expected: 150
console.log("withdraw(200): ", account.withdraw(200)); // expected: false
console.log("withdraw(30): ", account.withdraw(30)); // expected: true
console.log("balance after withdraw: ", account.balance); // expected: 120

// Question 7 (Module 9 — Global augmentation & declaration merging):
// Augment the global `Array<T>` interface (via `declare global`) to add
// an `isEmpty(): boolean` method, then implement it on `Array.prototype`.
// Expected: [].isEmpty() -> true, [1, 2].isEmpty() -> false
// Once merged, try:
// console.log("[].isEmpty(): ", [].isEmpty());
// console.log("[1, 2].isEmpty(): ", [1, 2].isEmpty());

console.log("exiting");
