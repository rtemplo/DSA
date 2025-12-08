export function isAlphabeticPalindrome(text: string): boolean {
  let filteredText: string = "";

  for (const char of text) {
    const code = char.charCodeAt(0);
    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      filteredText += char;
    }
  }

  const lowerCaseFilteredText = filteredText.toLowerCase();

  for (let i = 0; i < Math.floor(lowerCaseFilteredText.length / 2); i++) {
    const mirrorIndex = lowerCaseFilteredText.length - 1 - i;
    if (lowerCaseFilteredText[i] !== lowerCaseFilteredText[mirrorIndex]) return false;
  }

  return true;
}

export const isAlphabeticPalindrome2 = (text: string): boolean => {
  const isAlpha = (char: string): boolean => {
    const code = char.charCodeAt(0);
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
  };

  let left = 0;
  let right = text.length - 1;

  while (left < right) {
    // Skip non-alphabetic from left
    while (left < right && !isAlpha(text[left]!)) left++;
    // Skip non-alphabetic from right
    while (left < right && !isAlpha(text[right]!)) right--;

    if (text[left]!.toLowerCase() !== text[right]!.toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
};
