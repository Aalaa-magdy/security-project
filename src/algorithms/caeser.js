
export function encryptCaesar(plainText, shift) {
  let cipherText = "";
  for (let char of plainText) {
    if (/[A-Za-z]/.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const base = isUpperCase ? 65 : 97;
      cipherText += String.fromCharCode(((char.charCodeAt() - base + shift) % 26) + base);
    } else {
      cipherText += char; 
    }
  }
  return cipherText;
}

export function decryptCaesar(cipherText, shift) {
  let plainText = "";
  for (let char of cipherText) {
    if (/[A-Za-z]/.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const base = isUpperCase ? 65 : 97;
      plainText += String.fromCharCode(((char.charCodeAt() - base - shift + 26) % 26) + base);
    } else {
      plainText += char; 
    }
  }
  return plainText;
}

