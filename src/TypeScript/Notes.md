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
     `type PartialExcept<T, K extends keyof T>` <== K is a property or a union of properties from T

  2. between interfaces, merges the interfaces where the last interface takes precedence for any properties in common.

  3. in a ternary creates conditional types
