export function encryptRailFence(plaintext, rails) {
  if (rails <= 1) return plaintext;

  const fence = Array.from({ length: rails }, () => []);
  let rail = 0;
  let direction = 1; // 1 means moving down, -1 means moving up

 
  for (const char of plaintext) {
      fence[rail].push(char);
      rail += direction;

      // Change direction at the top or bottom rail
      if (rail === 0 || rail === rails - 1) {
          direction *= -1;
      }
  }

 
  return fence.flat().join("");
}

export function decryptRailFence(ciphertext, rails) {
  if (rails <= 1) return ciphertext;

  const fence = Array.from({ length: rails }, () => []);
  let rail = 0;
  let direction = 1;
  const fenceMap = Array(ciphertext.length).fill(0);

 
  for (let i = 0; i < ciphertext.length; i++) {
      fenceMap[i] = rail;
      rail += direction;

      if (rail === 0 || rail === rails - 1) {
          direction *= -1;
      }
  }

 
  let index = 0;
  for (let r = 0; r < rails; r++) {
      for (let i = 0; i < ciphertext.length; i++) {
          if (fenceMap[i] === r) {
              fence[r].push(ciphertext[index++]);
          }
      }
  }


  let plaintext = "";
  rail = 0;
  direction = 1;

  for (let i = 0; i < ciphertext.length; i++) {
      plaintext += fence[rail].shift();
      rail += direction;

      if (rail === 0 || rail === rails - 1) {
          direction *= -1;
      }
  }

  return plaintext;
}
