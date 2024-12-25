
export function encryptPolyalphabetic(plainText, key) {
  if (!plainText || !key) {
      alert("Both plain text and key are required.");
      return "";
  }

  let cipherText = "";
  key = key.toUpperCase();
  for (let i = 0, j = 0; i < plainText.length; i++) {
    const char = plainText[i];
    if (/[A-Za-z]/.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const base = isUpperCase ? 65 : 97;
      cipherText += String.fromCharCode(
        ((char.charCodeAt() - base + (key[j % key.length].charCodeAt() - 65)) % 26) + base
      );
      j++;
    } else {
      cipherText += char; // Non-alphabetic characters remain unchanged
    }
  }
  return cipherText;
}

export function decryptPolyalphabetic(cipherText, key) {
  if (!cipherText || !key) {
      alert("Both plain text and key are required.");
      return "";
  }

  let plainText = "";
  key = key.toUpperCase();
  for (let i = 0, j = 0; i < cipherText.length; i++) {
    const char = cipherText[i];
    if (/[A-Za-z]/.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const base = isUpperCase ? 65 : 97;
      plainText += String.fromCharCode(
        ((char.charCodeAt() - base - (key[j % key.length].charCodeAt() - 65) + 26) % 26) + base
      );
      j++;
    } else {
      plainText += char; // Non-alphabetic characters remain unchanged
    }
  }
  return plainText;
}
