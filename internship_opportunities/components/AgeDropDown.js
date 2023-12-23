'use client'
import { useState } from 'react';

const AgeDropdown = ({ setSelectedGrade }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedGrade, setSelectedGradeLocal] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleGradeClick = (grade) => {
    setSelectedGradeLocal(grade);
    setSelectedGrade(grade); // Notify parent component about the selected grade
  };

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-bg lg:flex">
      <div className="fixed left-0 top-0 flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <button onClick={toggleDropdown}>
          <ins>Select Grade</ins>
        </button>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <button
              onClick={() => handleGradeClick('9th Grade')}
              style={{
                display: 'block',
                color: selectedGrade === '9th Grade' ? 'blue' : 'inherit',
              }}
            >
              9th Grade
            </button>
            <button
              onClick={() => handleGradeClick('10th Grade')}
              style={{
                display: 'block',
                color: selectedGrade === '10th Grade' ? 'blue' : 'inherit',
              }}
            >
              10th Grade
            </button>
            <button
              onClick={() => handleGradeClick('11th Grade')}
              style={{
                display: 'block',
                color: selectedGrade === '11th Grade' ? 'blue' : 'inherit',
              }}
            >
              11th Grade
            </button>
            <button
              onClick={() => handleGradeClick('12th Grade')}
              style={{
                display: 'block',
                color: selectedGrade === '12th Grade' ? 'blue' : 'inherit',
              }}
            >
              12th Grade
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeDropdown;
