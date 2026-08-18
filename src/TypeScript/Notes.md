# Advanced Concepts

- `keyof T` generates a union type out of `T`'s keys.
- Defining a mapped type property: `[P in keyof T]` - the `in` keyword iterates over the keys of `T`
- A tuple can be generated from an array with `as const`:
  `const roles = ["admin", "editor", "viewer"] as const;`
  can be converted to a union type when its indexer is added:
  `type Role = (typeof roles)[number];`
- functions, enums, and classes can be extended by a `namespace` with additional values. i.e.

```ts
function createId(prefix: string): string {
  createId.count++;
  return `${prefix}-id`;
}

namespace createId {
  export let count = 0;
}
```

- `extends` keyword contexts, when used:
  1. on a generic parameter, restricts the shape of the parameter.
     `type PartialExcept<T, K extends keyof T>` <== K can be a single property from T or a union of properties from T.

  2. on interface definitions -merges the interface with the one it is extending. Properties in common are overriden.

  3. in a ternary creates conditional types

## Generic defaults vs. generic inference

**Question:** Given that both the generics `A` and `R` have default values, why do they have to be explicitly specified as `VariadicFunction<A, R>`? In doing so the generic type parameters in front of the function also become necessary. This correctly infers `test1` as `number`.

```ts
// a type that represents an array of unknown arguments
type Args = unknown[];
// A function that takes a variable amount of unknown arguments and returns a result of unknown type
type VariadicFunction<A extends Args = Args, R = unknown> = (...args: A) => R;

// Function that takes a function as an argument and returns a nested function.
const withFunctionAsArg = <A extends unknown[], R>(
  func: VariadicFunction<A, R>,
): VariadicFunction<A, R> => {
  /*do something with the func*/
  return (...args) => {
    return func(...args);
  };
};

const test1 = withFunctionAsArg(basicAddFunction)(1, 2);
```

Were it written like this to allow defaults:

```ts
const withFunctionAsArg = (func: VariadicFunction): VariadicFunction => {
  /*do something with the func*/
  return (...args) => {
    return func(...args);
  };
};
```

there would be no error, but `test1` remains typed as `unknown`.

Is it because without `<A extends unknown[], R>` in front of the function there is no interface to supply the types TypeScript can infer from `basicAddFunction`?

**Answer:** Yes, that's exactly it.

Generic type parameters can only be inferred at a **call site** where TypeScript has a generic signature to match against. Inference doesn't propagate through a type alias that's already been resolved to its defaults.

In the second version:

```ts
const withFunctionAsArg = (func: VariadicFunction): VariadicFunction => { ... };
```

`VariadicFunction` with no type arguments immediately resolves to `VariadicFunction<Args, unknown>` (its defaults) _before_ `withFunctionAsArg` is ever called. At that point the parameter `func` has type `(...args: unknown[]) => unknown`, and the return type is also `(...args: unknown[]) => unknown`. There is no generic left on `withFunctionAsArg` itself — it's just an ordinary function with fixed, non-generic types. So when you call `withFunctionAsArg(basicAddFunction)`, there's nothing to infer _from_; `basicAddFunction` is simply checked for assignability to the already-concrete parameter type, and the result is whatever the already-concrete return type says: `unknown`.

In the first version:

```ts
const withFunctionAsArg = <A extends unknown[], R>(func: VariadicFunction<A, R>): VariadicFunction<A, R> => { ... };
```

`withFunctionAsArg` itself is a generic function with type parameters `A` and `R`. Now `VariadicFunction<A, R>` isn't resolved to defaults — `A` and `R` are open variables tied to `withFunctionAsArg`'s own generic signature. When you call `withFunctionAsArg(basicAddFunction)`, TypeScript performs inference: it unifies the type of `basicAddFunction` (`(a: number, b: number) => number`) against the parameter type `VariadicFunction<A, R>` (i.e. `(...args: A) => R`), solving `A = [number, number]` and `R = number`. Those inferred values then flow into the return type `VariadicFunction<A, R>`, giving `(a: number, b: number) => number`, which is why `test1` ends up correctly typed as `number` after calling it with `(1, 2)`.

So the key distinction:

- **Defaults on a type alias's own parameters** (`VariadicFunction<A extends Args = Args, R = unknown>`) only matter when you reference that alias _without supplying arguments and without it being tied to an enclosing generic context_ — they're a fallback for "nothing else determined this."
- **Generic parameters on the function** (`<A extends unknown[], R>`) are what create inference sites. TypeScript infers generics from function _call_ arguments against a function's _own_ declared type parameters — not by reaching into a type alias used somewhere in a non-generic signature and asking "could this have been generic?"

Without `<A extends unknown[], R>` on `withFunctionAsArg`, there is no generic signature for TypeScript to solve against — the defaults on `VariadicFunction` fire immediately, collapsing everything to `unknown` before any call ever happens.
