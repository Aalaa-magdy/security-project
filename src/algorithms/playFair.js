
function generateKeyMatrix(key) {
  key = key.toUpperCase().replace(/J/g, "I"); // Replace J with I
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  const matrix = [];
  const seen = new Set();

 
  for (let char of key) {
      if (!seen.has(char) && alphabet.includes(char)) {
          seen.add(char);
          matrix.push(char);
      }
  }

 
  for (let char of alphabet) {
      if (!seen.has(char)) {
          seen.add(char);
          matrix.push(char);
      }
  }

 
  return Array.from({ length: 5 }, (_, i) => matrix.slice(i * 5, i * 5 + 5));
}


function preprocessText(text) {
  // Convert to uppercase and replace 'J' with 'I'
  text = text.toUpperCase().replace(/J/g, "I");
  // Remove non-alphabetic characters
  text = text.replace(/[^A-Z]/g, "");
  let processedText = "";

  for (let i = 0; i < text.length; i++) {
      processedText += text[i];
      // Insert 'X' between duplicate letters in a digraph
      if (i < text.length - 1 && text[i] === text[i + 1]) {
          processedText += "X";
      }
  }

  // If the length is odd, append 'X' to make it even
  if (processedText.length % 2 !== 0) {
      processedText += "X";
  }

  return processedText;
}



function findPosition(matrix, char) {
  for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
          if (matrix[row][col] === char) {
              return { row, col };
          }
      }
  }
  alert(`Character ${char} not found in key matrix.`);
}


function processDigraph(matrix, digraph, mode) {
  const pos1 = findPosition(matrix, digraph[0]);
  const pos2 = findPosition(matrix, digraph[1]);

  if (pos1.row === pos2.row) {
      // Same row: Shift columns
      return (
          matrix[pos1.row][(pos1.col + mode + 5) % 5] +
          matrix[pos2.row][(pos2.col + mode + 5) % 5]
      );
  } else if (pos1.col === pos2.col) {
      // Same column: Shift rows
      return (
          matrix[(pos1.row + mode + 5) % 5][pos1.col] +
          matrix[(pos2.row + mode + 5) % 5][pos2.col]
      );
  } else {
      // Rectangle swap columns
      return (
          matrix[pos1.row][pos2.col] +
          matrix[pos2.row][pos1.col]
      );
  }
}


export function encryptPlayfair(plaintext, key) {

  const matrix = generateKeyMatrix(key);
  const processedText = preprocessText(plaintext);
  let ciphertext = "";

  for (let i = 0; i < processedText.length; i += 2) {
      const digraph = processedText.substr(i, 2);
      ciphertext += processDigraph(matrix, digraph, 1); // mode = 1 for encryption
  }

  return ciphertext;
}


export function decryptPlayfair(ciphertext, key) {
  const matrix = generateKeyMatrix(key);
  let plaintext = "";

  for (let i = 0; i < ciphertext.length; i += 2) {
      const digraph = ciphertext.substr(i, 2);
      plaintext += processDigraph(matrix, digraph, -1); // mode = -1 for decryption
  }

  return plaintext.replace(/X/g, ""); // Remove filler characters
}


