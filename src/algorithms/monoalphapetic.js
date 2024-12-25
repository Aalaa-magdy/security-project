export function encryptMono(plainText, key) {
  let encryptedText = '';
  key=  key.toUpperCase()
  plainText = plainText.toUpperCase()
  for (let i = 0; i < plainText.length; i++) {
      let char = plainText[i];
     
      if (char.match(/[A-Z]/)) {
          encryptedText += key[char.charCodeAt(0) - 65]; 
      } 
     
      else {
          encryptedText += char; 
      }
  }
  return encryptedText;
}

export function decryptMono(encryptedText, key) {
  let decryptedText = '';
  
  key=  key.toUpperCase()
  encryptedText = encryptedText.toUpperCase()
  let reverseKey = Array(26);
  for (let i = 0; i < 26; i++) {
      reverseKey[key.charCodeAt(i) - 65] = String.fromCharCode(i + 65);
  }
  for (let i = 0; i < encryptedText.length; i++) {
      let char = encryptedText[i];
    
      if (char.match(/[A-Z]/)) {
          decryptedText += reverseKey[char.charCodeAt(0) - 65];
      }  
      else {
          decryptedText += char; 
      }
  }
  return decryptedText;
}
