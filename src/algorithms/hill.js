
export function encryptHillCipher(plaintext, key) {
  
  const keyLength = key.length;
  const matrixSize = Math.sqrt(keyLength);
  if (matrixSize % 1 !== 0) {
    alert("Key length must be a perfect square for the Hill Cipher.");
    return "";
  }

  plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
  key = key.toUpperCase().replace(/[^A-Z]/g, '');


  let keyMatrix = [];
  for (let i = 0; i < matrixSize; i++) {
    keyMatrix.push([]);
    for (let j = 0; j < matrixSize; j++) {
      keyMatrix[i].push(key.charCodeAt(i * matrixSize + j) - 'A'.charCodeAt(0));
    }
  }

 
  const plaintextNumbers = Array.from(plaintext).map(char => char.charCodeAt(0) - 'A'.charCodeAt(0));


  function matrixMultiply(matrix, vector) {
    return matrix.map(row => row.reduce((sum, value, index) => sum + value * vector[index], 0) % 26);
  }

  
  const ciphertextNumbers = [];
  for (let i = 0; i < plaintextNumbers.length; i += matrixSize) {
    const block = plaintextNumbers.slice(i, i + matrixSize);

    // If the block is smaller than matrix size, pad it with 'X' (23)
    while (block.length < matrixSize) {
      block.push('X'.charCodeAt(0) - 'A'.charCodeAt(0));
    }

    const encryptedBlock = matrixMultiply(keyMatrix, block);
    ciphertextNumbers.push(...encryptedBlock);
  }

 
  const ciphertext = ciphertextNumbers.map(num => String.fromCharCode(num + 'A'.charCodeAt(0))).join('');
  return ciphertext;
}



function modInverse(a, m) {
  a = a % m;
  for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
          return x;
      }
  }
  alert("Modular inverse doesn't exist");
}


function determinantMod26(matrix) {
  let det = (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % 26;
  return (det + 26) % 26; // Ensure positive modulo
}


function inverseMatrix2x2(matrix) {
  const det = determinantMod26(matrix);
  const detInverse = modInverse(det, 26);

 
  let inverse = [
      [matrix[1][1], -matrix[0][1]],
      [-matrix[1][0], matrix[0][0]]
  ];

 
  for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
          inverse[i][j] = (inverse[i][j] * detInverse) % 26;
          if (inverse[i][j] < 0) inverse[i][j] += 26; 
      }
  }

  return inverse;
}


export  function decryptHillCipher(ciphertext, keyMatrix) {
 
  const inverseKey = inverseMatrix2x2(keyMatrix);

  let plaintext = "";
  for (let i = 0; i < ciphertext.length; i += 2) {
     
      const cipherVector = [
          ciphertext[i].charCodeAt(0) - 65,
          ciphertext[i + 1].charCodeAt(0) - 65
      ];

      const plainVector = [0, 0];
      for (let row = 0; row < 2; row++) {
          for (let col = 0; col < 2; col++) {
              plainVector[row] += inverseKey[row][col] * cipherVector[col];
          }
          plainVector[row] %= 26; 
      }

      plaintext += String.fromCharCode(plainVector[0] + 65);
      plaintext += String.fromCharCode(plainVector[1] + 65);
  }

  return plaintext;
}



