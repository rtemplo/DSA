export function isNonTrivialRotation(s1: string, s2: string): boolean {
  if (s1 === s2 || s1.length !== s2.length) return false;
  const s1Array = s1.split("");

  for (let i = 0; i < s1Array.length; i++) {
    s1Array.push(s1Array.shift()!);
    const _s1 = s1Array.join("");
    if (_s1 === s2) return true;
  }

  return false;
}

const rotation = isNonTrivialRotation("abcde", "cdeab");
console.log(rotation);
