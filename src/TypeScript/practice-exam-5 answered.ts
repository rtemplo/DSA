/**
 * Practice Exam 5
 * Covers regimen modules:
 * 1 (Fundamentals),
 * 2 (Functions & Generics),
 * 4 (Advanced Object Types),
 * 6 (Template Literal Types),
 * 9 (Modules & Declaration Files),
 * 10 (Advanced/Type-level Programming).
 * See PRACTICE-REGIMEN.md for the full curriculum.
 *
 * Each question has a stub placeholder so the file compiles as-is.
 * Replace the stub with your solution, then run to check the console output.
 */

// Question 1 (Module 1 — Literal unions & control flow):
// Write `isSafeMethod`, which returns true for the "safe" HTTP methods
// ("GET", "HEAD", "OPTIONS") and false for the rest.
// Expected: isSafeMethod("GET") -> true, isSafeMethod("POST") -> false
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

function isSafeMethod(
  method: HttpMethod
): method is Exclude<HttpMethod, "POST" | "PUT" | "DELETE" | "PATCH"> {
  return method === "GET" || method === "HEAD" || method === "OPTIONS";
}

console.log("isSafeMethod('GET'): ", isSafeMethod("GET")); // expected: true
console.log("isSafeMethod('POST'): ", isSafeMethod("POST")); // expected: false
console.log("isSafeMethod('HEAD'): ", isSafeMethod("HEAD")); // expected: true

// Question 2 (Module 2 — Generic constraints):
// Write `pluck`, which extracts the value at `key` from every item in
// `items`, constrained so `key` must be an actual key of `T`.
// Expected: pluck(people, "name") -> ["Ada", "Lin"]
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

const people = [
  { name: "Ada", age: 30 },
  { name: "Lin", age: 25 },
];
console.log("pluck(people, 'name'): ", pluck(people, "name"));

// Question 3 (Module 4 — Mapped types):
// Write `Nullable<T>`, a mapped type that makes every property of `T`
// also accept `null`.
// Expected: Nullable<Profile> -> { name: string | null; age: number | null }
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

interface Profile {
  name: string;
  age: number;
}
export type NullableProfile = Nullable<Profile>;

const profile: NullableProfile = { name: "Ada", age: 30 };
console.log("profile: ", profile);
// Once implemented, this should also compile:
// const clearedProfile: NullableProfile = { name: null, age: null };

// Question 4 (Module 6 — Template literal types in mapped keys):
// Write `Getters<T>`, which turns each property `k` of `T` into a
// `getK: () => T[k]` method signature (capitalizing `k`).
// Expected: Getters<Point> -> { getX: () => number; getY: () => number }
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Point {
  x: number;
  y: number;
}
export type PointGetters = Getters<Point>;

// Question 5 (Module 9 — Namespace & class declaration merging):
// Merge a `namespace Song` with the `Song` class below so that
// `Song.parse` builds an instance from a "Title by Artist" string.
// Expected: Song.parse("Blue by Ada") -> Song { title: "Blue", artist: "Ada" }
class Song {
  constructor(
    public title: string,
    public artist: string
  ) {}
}

namespace Song {
  export function parse(songInfo: string): Song {
    const [songTitle, artist] = songInfo.split(" by ");
    if (!songTitle || !artist) {
      throw new Error("Invalid song info format. Expected 'Title by Artist'.");
    }
    return new Song(songTitle, artist);
  }
}

const song = new Song("Blue", "Ada");
console.log("song: ", song);
// Once merged, also try:
console.log("Song.parse('Blue by Ada'): ", Song.parse("Blue by Ada"));

// Question 6 (Module 10 — Recursive mapped types):
// Write `DeepPartial<T>`, like `Partial<T>` but applied recursively so
// nested object properties become optional too.
// Expected: { server: { port: 9090 } } satisfies PartialSettings
type DeepPartial<T> = T extends object
  ? T extends (...args: never[]) => unknown
    ? T
    : { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

interface Settings {
  debug: boolean;
  server: { host: string; port: number };
}
export type PartialSettings = DeepPartial<Settings>;

const partialSettings: PartialSettings = {
  debug: false,
  server: { host: "localhost", port: 8080 },
};
console.log("partialSettings: ", partialSettings);
// Once implemented, this should also compile:
const emptyOverride: PartialSettings = { server: { port: 9090 } };

console.log("exiting");
