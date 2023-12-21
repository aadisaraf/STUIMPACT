'use client'
import { useState } from 'react';

const DropdownMenu = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-bg lg:flex">
    <div className="fixed left-0 top-0 flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      <button onClick={toggleDropdown}><ins>Toggle Dropdown</ins></button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          {/* Insert Dropdown Items Here*/}
          <p> </p>
          <p>9th Grade</p>
          <p>10th Grade</p>
          <p>11th Grade</p>
          <p>12th Grade</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default DropdownMenu;
