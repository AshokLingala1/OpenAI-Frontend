import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showGreet, setShowGreet] = useState(true);
  const [theme, setTheme] = useState('light');
  const [file, setFile] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

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

  try {
    let response;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Send to /info/{prompt}
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
      // Fallback for text-only prompts
      response = await axios.get(`https://springbootopenai.onrender.com/api/${encodeURIComponent(input)}`);
    }

    const aiMessage = {
      from: 'bot',
      text: response.data,
    };
    setMessages(prev => [...prev, aiMessage]);
    setFile(null); // Reset file
  } catch (err) {
    console.error(err);
    setMessages(prev => [
      ...prev,
      { from: 'bot', text: 'Something went wrong. Please try again.' },
    ]);
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
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'} h-screen flex flex-col`}>
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 shadow-md">
        <h1 className="text-xl font-bold">Ashok's AI Chat</h1>
        <button onClick={handleThemeToggle} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>

      {/* Chat Window */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
        {showGreet && (
          <div className="text-center text-gray-500 mt-8">👋 Hi there! Ask me anything to get started.</div>
        )}

        {messages.map((message, index) => (
  <div
    key={index}
    className={`flex ${
      message.from === 'user' ? 'justify-end' : 'justify-start'
    } mb-2`}
  >
    <div
      className={`max-w-xs md:max-w-md lg:max-w-2xl break-words p-3 rounded-2xl shadow-md ${
        message.from === 'user'
          ? 'bg-blue-500 text-white rounded-br-none'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
      }`}
    >
      {/* Show uploaded image if it's from user and has image property */}
      {message.from === 'user' && message.image && (
        <img
          src={message.image}
          alt="User uploaded"
          className="max-w-full max-h-80 rounded-lg mb-2"
        />
      )}

      {/* Show AI image response or text */}
      {message.text.startsWith('http') ? (
        <img
          src={message.text}
          alt="AI response"
          className="max-w-full max-h-80 rounded-lg"
        />
      ) : (
        <p className="whitespace-pre-wrap">{message.text}</p>
      )}
    </div>
  </div>
))}

      </div>

      {/* Input Area */}
      <div className="p-4 flex items-center gap-2 border-t border-gray-700">
        <input
          type="text"
          className="flex-1 p-2 pr-7 border rounded-md outline-none  bg-gray-400"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <input
          type="file"
          accept="image/jpeg"
          onChange={handleFileChange}
          className="text-sm border-1 py-2.5 rounded-tl-2xl rounded-br-2xl"
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
