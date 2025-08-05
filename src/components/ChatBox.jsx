import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { TypingDots } from './TypingDots';

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showGreet, setShowGreet] = useState(true);
  const [theme, setTheme] = useState('light');
  const [file, setFile] = useState(null);
  const chatRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
  if (!input.trim()) return;

  const newMessages = [...messages, { from: "user", text: input }];
  setMessages(newMessages);
  setInput(""); // Clear input field
  setIsTyping(true); // ✅ Show typing animation

  try {
    const response = await axios.post(`http://localhost:8080/ask`, {
      message: input,
    });

    // simulate delay if needed (optional)
    // await new Promise(resolve => setTimeout(resolve, 1000));

    setMessages([
      ...newMessages,
      { from: "bot", text: response.data }, // 👈 Add bot response
    ]);
  } catch (err) {
    console.error(err);
    setMessages([
      ...newMessages,
      { from: "bot", text: "Error: Failed to get response." },
    ]);
  } finally {
    setIsTyping(false); // ✅ Hide typing animation
  }
};


  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const sendMessage = async () => {
  if (!input.trim() && !file) return;

  const userMessage = {
    from: 'user',
    text: input || (file ? file.name : ''),
    image: file ? URL.createObjectURL(file) : null,
  };
  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setShowGreet(false);
  setIsTyping(true); // 👉 Start typing animation

  try {
    let response;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      response = await axios.post(
        `https://springbootopenai.onrender.com/info/${encodeURIComponent(input || 'Describe this image')}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    } else {
      response = await axios.get(
        `https://springbootopenai.onrender.com/api/${encodeURIComponent(input)}`
      );
    }

    const aiMessage = {
      from: 'bot',
      text: response.data,
    };
    setMessages(prev => [...prev, aiMessage]);
    setFile(null);
  } catch (err) {
    console.error(err);
    setMessages(prev => [
      ...prev,
      { from: 'bot', text: 'Something went wrong. Please try again.' },
    ]);
  } finally {
    setIsTyping(false); // 👉 Stop typing animation
  }
};


  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile.size > 50 * 1024) {
      alert("It can take any size of file but Ashok has reduced its functionality to work with 50 KB. Please select a JPEG image near 50 KB.");
      return;
    }
    setFile(selectedFile);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
  flex flex-col w-full max-w-full min-h-[calc(100vh-4rem)] sm:max-w-2xl mx-auto`}>
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 sm:p-5 shadow-md">
        <h1 className="text-lg sm:text-xl font-bold">Ashok's AI Chat</h1>
        <button onClick={handleThemeToggle} className="text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>

      {/* Chat Window */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
        {showGreet && (
          <div className="text-center text-sm text-gray-500 mt-4">👋 Hi there! Ask me anything to get started.</div>
        )}

        {messages.map((msg, index) => (
  <div
    key={index}
    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} mb-2`}
  >
    <div
      className={`max-w-xs md:max-w-md lg:max-w-2xl p-3 rounded-2xl ${
        msg.from === "user"
          ? "bg-blue-500 text-white rounded-br-none"
          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
      } shadow-md`}
    >
      {msg.text}
    </div>
  </div>
))}

{/* 👇 Typing indicator */}
{isTyping && (
  <div className="flex justify-start mb-2">
    <div className="max-w-xs md:max-w-md lg:max-w-2xl p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-md">
      <TypingDots />
    </div>
  </div>
)}


      </div>

      {/* Input Area */}
      <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-center gap-2 border-t border-gray-700">
        <input
          type="text"
          className="flex-1 p-2 text-sm sm:text-base border rounded-md outline-none bg-gray-200 dark:bg-gray-500"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <input
          type="file"
          accept="image/jpeg"
          onChange={handleFileChange}
          className="text-xs sm:text-sm py-2 px-1"
        />
        <button
          onClick={sendMessage}
          className="w-full sm:w-auto bg-green-500 text-white px-3 py-2 text-sm sm:text-base rounded hover:bg-green-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
