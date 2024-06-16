import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const LightDarkToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="light-dark-toggle flex flex-row justify-end">
      <button onClick={toggleDarkMode} className={`flex items-center gap-1 ${isDarkMode ? ' ' : 'text-black'}`}>
        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
    </div>
  );
};

export default LightDarkToggle;
