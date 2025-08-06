import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={
      `${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen flex flex-col`
    }>
      <Header toggleTheme={() => setDarkMode(!darkMode)} />
      <main className="flex flex-1 justify-center p-2 sm:p-4">
        <ChatBox />
      </main>
      <Footer />
    </div>
  );
}