/* eslint-disable no-unused-vars */

import { useState } from 'react';
import './App.css'
import Menu from "./components/Menu";
import Result from './components/Result.jsx';
import React from 'react';
import AlgorithmForm from './components/AlgorithmForm';
import { encryptOTP,decryptOTP } from './algorithms/OTP.js';
import { encryptCaesar, decryptCaesar } from './algorithms/caeser.js';
import { encryptPlayfair,decryptPlayfair } from './algorithms/playFair.js';
import { encryptPolyalphabetic,decryptPolyalphabetic } from './algorithms/polyalphapetic.js';
import { encryptRailFence,decryptRailFence } from './algorithms/railFence.js';
import {  encryptHillCipher,decryptHillCipher } from './algorithms/hill.js';
import { encryptRowColumn,decryptRowColumn } from './algorithms/rowColTransposition';
import { encryptMono,decryptMono } from './algorithms/monoalphapetic.js';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [result, setResult] = useState("");



  const handleEncrypt = (text, key) => {
    if (selectedAlgorithm === "Caesar cipher") {
      setResult(encryptCaesar(text, key));
    } 
    else if (selectedAlgorithm === "One Time Pad algorithm") {
      setResult(encryptOTP(text,key));
    }
    else if (selectedAlgorithm === "Playfair cipher") {
      setResult(encryptPlayfair(text, key));
    }
    else if (selectedAlgorithm === "Polyalphabetic cipher") {
      setResult(encryptPolyalphabetic(text, key));
    }
    else if (selectedAlgorithm === "Rail fence cipher") {
      setResult(encryptRailFence(text, key));
    }
    else if (selectedAlgorithm === "Hill cipher") {
      setResult(encryptHillCipher(text, key));
    }
    else if (selectedAlgorithm === "Row Column Transposition cipher") {
      setResult(encryptRowColumn(text, key));
    }
    else if (selectedAlgorithm === "Monoalphabetic cipher") {
      setResult(encryptMono(text, key));
    }
    else {
      alert("Please select an algorithm");
    }
  };

  const handleDecrypt = (text, key) => {
    if (selectedAlgorithm === "Caesar cipher") {
      setResult(decryptCaesar(text, key));
    } else if (selectedAlgorithm === "One Time Pad algorithm") {
      setResult(decryptOTP(text, key));
    }
    else if (selectedAlgorithm === "Playfair cipher") {
      setResult(decryptPlayfair(text, key));
    }
    else if (selectedAlgorithm === "Polyalphabetic cipher") {
      setResult(decryptPolyalphabetic(text, key));
    }
    else if (selectedAlgorithm === "Rail fence cipher") {
      setResult(decryptRailFence(text, key));
    }
    else if (selectedAlgorithm === "Hill cipher") {
      setResult(decryptHillCipher(text, key));
    }
    else if (selectedAlgorithm === "Row Column Transposition cipher") {
      setResult(decryptRowColumn(text, key));
    }
    else if (selectedAlgorithm === "Monoalphabetic cipher") {
      setResult(decryptMono(text, key));
    }
    else {
      alert("Please select an algorithm");
    }

  };

  return (
    <div className="container">
      {!selectedAlgorithm ? (
        <Menu onSelectAlgorithm={setSelectedAlgorithm} />
      ) : (
        <div>
          <button onClick={() => {setSelectedAlgorithm(null)
                                  setResult(null);  }}>Back</button>
          <AlgorithmForm
            algorithm={selectedAlgorithm}
            onEncrypt={handleEncrypt}
            onDecrypt={handleDecrypt}
          />
          {result && <Result result={result} />}
        </div>
      )}
    </div>
  )
}

export default App
