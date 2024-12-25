/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react'
import { useState } from 'react';
import '../index.css'
const AlgorithmForm = ({ algorithm, onEncrypt, onDecrypt }) => {

  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  return (
    <div >
      <h3>{algorithm} Encryption/Decryption</h3>
      <div className='handleForm'>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value.toUpperCase())}
      />
      {(algorithm !== "Rail fence cipher" && algorithm !== "Caeser") && (
        <input
          type="text"
          placeholder="Enter key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      )}
      {
        (algorithm ===  "Rail fence cipher" || algorithm === "Caeser") && (
          <input
            type="number"
            placeholder="Enter The Number"
            value={key}
            onChange={(e) => setKey(Number(e.target.value))}
          />
        )
      }
      </div>
      <div className='handle-button-form'>
        <button onClick={() => onEncrypt(text, key)}>Encrypt</button>
        <button onClick={() => onDecrypt(text, key)}>Decrypt</button>
      </div>
    </div>
  );
};


export default AlgorithmForm