/**
 * More practical examples of Conditional Types
 */

/**
 * Example 1: Determine if a value is JSON serializable
 * No classes, functions, symbols, or undefined values are JSON serializable, so we can use a conditional type to check if a type is JSON safe.
 * We check if the type is a primitive (string, number, boolean, or null), then we check if it's an array and recursively check the item type, and finally we check if it's an object and recursively check the properties.
 * If none of these conditions are met, we return never, indicating that the type is not JSON safe.
 */

type JsonSafe<T> = T extends string | number | boolean | null
  ? T
  : T extends (infer U)[]
    ? JsonSafe<U>[]
    : T extends object
      ? { [K in keyof T]: JsonSafe<T[K]> }
      : never;

interface BadUser {
  id: number;
  name: string;
  meta: {
    tags: string[];
    created: Date; // ❌ not JSON-safe
  };
}

interface GoodUser {
  id: number;
  name: string;
  meta: {
    tags: string[];
    created: number;
  };
}

const user1: BadUser = {
  id: 1,
  name: "Gray",
  meta: {
    tags: ["admin"],
    created: new Date(),
  },
};

const user2: GoodUser = {
  id: 1,
  name: "Gray",
  meta: {
    tags: ["admin"],
    created: Date.now(),
  },
};

type JsonSafeUser = JsonSafe<GoodUser>; // never

export function saveUser(user: JsonSafeUser) {
  // This function can only accept JSON-safe users
  localStorage.setItem("user", JSON.stringify(user));
}

interface User {
  id: number;
  name: string;
  meta: {
    tags: string[];
    created: Date; // ❌ not JSON-safe
  };
}

export type SafeUser = JsonSafe<User>;
