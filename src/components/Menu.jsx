/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'; 
import '../index.css'
const Menu = ({ onSelectAlgorithm }) => {
  const algorithms = ["One Time Pad algorithm",
     "Hill cipher", "Monoalphabetic cipher","Caeser",
      "Polyalphabetic cipher" , "Rail fence cipher","Playfair cipher","Row Column Transposition cipher"];

  return (
    <div>
      <h3>Select Encryption Algorithm</h3>
      <ul className='options'>
        {algorithms.map((algo) => (
          <li key={algo}>
            <button onClick={() => onSelectAlgorithm(algo)}>{algo}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;