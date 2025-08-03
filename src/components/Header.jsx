import React from 'react';

export default function Header({ toggleTheme }) {
  return (
    <header className="flex justify-end pt-4 pr-5  dark:border-gray-700">
      <button onClick={toggleTheme} className="bg-gray-200 dark:bg-gray-600 text-sm px-3 py-1 rounded hover:opacity-80">
        Toggle Theme
      </button>
    </header>
  );
}