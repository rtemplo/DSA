/** 
What is being typed here?
* The type of a value in a key/value pair object, hence the generic parameters: 
*   <T, K extends keyof T>
* 
* If the value is an array then we infer the items within the array to type the array, 
*   otherwise we return the type of the value directly.
*/
type PropType<T, K extends keyof T> = T[K] extends Array<infer U> ? U[] : T[K];
/**
 * Here we use the PropType to type the return value of the get function,
 * which is the value of the key in the object.
 */
function get1<T, K extends keyof T>(obj: T, key: K): PropType<T, K> {
  return obj[key] as PropType<T, K>;
}

/**
 * PropType is however contrived as the below function will infer the type of the value directly
 * without needing to check if it's an array or not, as TypeScript will infer the type of the value
 * based on the key provided.
 */
function get2<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

/**
 * Exmples demonstrate the equivalence of the two get functions, where the type of the value is
 * correctly inferred in both cases, regardless of whether it's an array or not.
 */
const user = {
  id: 42,
  name: "Gray",
  tags: ["admin", "dev"],
};

const id1 = get1(user, "id");
const name1 = get1(user, "name");
const tags1 = get1(user, "tags");

const id2 = get2(user, "id");
const name2 = get2(user, "name");
const tags2 = get2(user, "tags");

console.log(id1); // 42
console.log(name1); // Gray
console.log(tags1); // ['admin', 'dev']

console.log(id2); // 42
console.log(name2); // Gray
console.log(tags2); // ['admin', 'dev']
