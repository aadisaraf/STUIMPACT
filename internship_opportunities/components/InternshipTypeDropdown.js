
'use client'
import { useState } from 'react';

const InternshipTypeDropdown = ({ setSelectedInternshipTypes }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleTypeClick = (type) => {
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter((selectedType) => selectedType !== type);
      } else {
        return [...prevSelectedTypes, type];
      }
    });
  };

  // Pass selected types to the parent component
  setSelectedInternshipTypes(selectedTypes);
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-bg lg:flex">
    <div className="fixed left-0 top-0 flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      <button onClick={toggleDropdown}><ins>Internship Type</ins></button>
      {isDropdownOpen && (
        <div className="dropdown-content">
        {/* Insert Dropdown Items Here*/}
        <button
          onClick={() => handleTypeClick('Computer and Technology')}
          style={{ color: selectedTypes.includes('Computer and Technology') ? 'blue' : 'inherit', display: 'block' }}
        >
          Computer and Technology
        </button>
        <button
          onClick={() => handleTypeClick('Arts')}
          style={{ color: selectedTypes.includes('Arts') ? 'blue' : 'inherit', display: 'block' }}
        >
          Arts
        </button>
        <button
          onClick={() => handleTypeClick('Media and Broadcasting')}
          style={{ color: selectedTypes.includes('Media and Broadcasting') ? 'blue' : 'inherit', display: 'block' }}
        >
          Media and Broadcasting
        </button>
        <button
          onClick={() => handleTypeClick('Justice and Legal')}
          style={{color: selectedTypes.includes('Justice and Legal') ? 'blue' : 'inherit', display: 'block' }}
        >
          Justice and Legal
        </button>
        <button
          onClick={() => handleTypeClick('Medicine')}
          style={{color: selectedTypes.includes('Medicine') ? 'blue' : 'inherit', display: 'block' }}
        >
          Medicine
        </button>
        <button
          onClick={() => handleTypeClick('Healthcare')}
          style={{color: selectedTypes.includes('Healthcare') ? 'blue' : 'inherit', display: 'block' }}
        >
          Healthcare
        </button>
        <button
          onClick={() => handleTypeClick('Politics')}
          style={{color: selectedTypes.includes('Politics') ? 'blue' : 'inherit', display: 'block' }}
        >
          Politics
        </button>
        <button
          onClick={() => handleTypeClick('Business')}
          style={{color: selectedTypes.includes('Business') ? 'blue' : 'inherit', display: 'block' }}
        >
          Business
        </button>
        <button
          onClick={() => handleTypeClick('Law Enforcement')}
          style={{color: selectedTypes.includes('Law Enforcement') ? 'blue' : 'inherit', display: 'block' }}
        >
          Law Enforcement
        </button>
      </div>
    )}
  </div>
</div>
);

};

export default InternshipTypeDropdown;
