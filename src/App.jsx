import React, { useState } from 'react';
import ChatBox from './components/chatBox';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <Header toggleTheme={() => setDarkMode(!darkMode)} />
      <main className="flex justify-center p-4">
        <ChatBox />
      </main>
      <Footer/>
    </div>
  );
}