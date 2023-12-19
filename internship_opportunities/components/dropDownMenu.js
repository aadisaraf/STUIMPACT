'use client'
import { useState } from 'react';

const DropdownMenu = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown}>Toggle Dropdown</button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          {/* Insert Dropdown Items Here*/}
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3 3</p>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
