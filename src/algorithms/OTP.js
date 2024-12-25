// Encrypt using XOR and encode the result in Base64
export function encryptOTP(plaintext, key) {
  if (plaintext.length !== key.length) {
      throw new Error("Key length must match the plaintext length.");
  }

  let ciphertext = '';
  for (let i = 0; i < plaintext.length; i++) {
      ciphertext += String.fromCharCode(plaintext.charCodeAt(i) ^ key.charCodeAt(i));
  }

  // Encode ciphertext to Base64
  return btoa(ciphertext); // `btoa` converts to Base64
}

// Decrypt Base64 ciphertext back to plaintext
export function decryptOTP(ciphertextBase64, key) {
  // Decode Base64 back to original ciphertext
  const ciphertext = atob(ciphertextBase64);

  if (ciphertext.length !== key.length) {
      throw new Error("Key length must match the ciphertext length.");
  }

  let plaintext = '';
  for (let i = 0; i < ciphertext.length; i++) {
      plaintext += String.fromCharCode(ciphertext.charCodeAt(i) ^ key.charCodeAt(i));
  }

  return plaintext;
}

