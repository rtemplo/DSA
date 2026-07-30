# TypeScript Practice Regimen

Curriculum for building up TypeScript's type-system features, module by module.
Existing files (`conditional-types1.ts`, `conditional-types2.ts`) already cover
parts of Module 5. Use this doc to pick the next topics and generate new exam
files (`practice-exam-N.ts`) that each sample a handful of questions across
multiple modules.

## Modules

1. **Fundamentals & Type Basics** — literal types, union/intersection,
   `type` vs `interface`, enums vs union literals, `as const`.
2. **Functions & Generics** — overloads, generic functions, generic
   constraints (`extends`), default generic params, generic classes.
3. **Objects, Arrays & Tuples** — `readonly`, optional properties, index
   signatures, labeled/variadic tuples.
4. **Advanced Object Types** — mapped types, `keyof`/`typeof`, indexed
   access types, built-in utility types (`Partial`, `Pick`, `Omit`,
   `Record`, `Required`, `Readonly`), recursive mapped types.
5. **Conditional Types & Inference** — conditional types, `infer`,
   distributive conditionals, `ReturnType`/`Parameters`/`InstanceType`.
6. **Template Literal Types** — template literal types, `Uppercase`/
   `Lowercase`/`Capitalize`, building key/route/event-name types.
7. **Discriminated Unions & Narrowing** — `typeof`/`instanceof`/`in`
   guards, discriminated unions, exhaustiveness checks via `never`,
   custom type predicates (`x is T`).
8. **Classes & OOP** — access modifiers, `abstract` classes, interfaces
   implementing, generics in classes, decorators.
9. **Modules & Declaration Files** — module resolution, namespaces vs
   modules, declaration merging, ambient `.d.ts` declarations.
10. **Advanced/Type-level Programming** — recursive types, tuple-to-union,
    `DeepPartial`/`DeepReadonly`, branded/nominal types, variance edge cases.

## Exam file conventions

- Each `practice-exam-N.ts` picks ~6-8 questions spanning several modules
  (not all from one topic).
- Every question gets a numbered comment block: goal, expected shape/behavior.
- Stub out a valid, trivially-typed placeholder (so the file always compiles)
  rather than leaving a type error — mirrors the pattern used in
  `src/misc/orders.ts` (e.g. `const unsoldProducts: Product[] = [];`).
- Follow each stub with a small runnable demo (`console.log`) so answers can
  be sanity-checked with `npm run dev`.

## Exam log

| File                 | Modules covered   |
| -------------------- | ----------------- |
| `practice-exam-1.ts` | 2, 4, 5, 6, 7     |
| `practice-exam-2.ts` | 1, 3, 7, 8, 9, 10 |
