
export function encryptRowColumn(plaintext, key) {
  const keyOrder = getKeyOrder(key);
  const numCols = keyOrder.length;
  const numRows = Math.ceil(plaintext.length / numCols);

 
  const grid = Array.from({ length: numRows }, (_, i) =>
      plaintext.slice(i * numCols, (i + 1) * numCols).padEnd(numCols, "X")
  );


  let ciphertext = "";
  for (const col of keyOrder) {
      for (let row = 0; row < numRows; row++) {
          ciphertext += grid[row][col];
      }
  }

  return ciphertext;
}

export function decryptRowColumn(ciphertext, key) {
  const keyOrder = getKeyOrder(key);
  const numCols = keyOrder.length;
  const numRows = Math.ceil(ciphertext.length / numCols);


  const grid = Array.from({ length: numRows }, () => Array(numCols).fill(""));


  
  let idx = 0;
  for (const col of keyOrder) {
      for (let row = 0; row < numRows; row++) {
          grid[row][col] = ciphertext[idx++];
      }
  }


  return grid.flat().join("").replace(/X+$/, ""); 
}


function getKeyOrder(key) {

  const sortedKey = [...key].sort();
  return key.split("").map(char => sortedKey.indexOf(char));
}

