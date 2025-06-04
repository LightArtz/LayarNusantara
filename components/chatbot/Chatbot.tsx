// components/chatbot/Chatbot.tsx
"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { ArrowDown, ArrowUp, Send, Bot, User, Sparkles, MessageSquareText } from 'lucide-react';
import ChatbotIcon from './ChatbotIcon';

interface Message {
  id: string;
  text: string | React.ReactNode;
  sender: 'user' | 'bot' | 'options';
}

const GEMINI_API_URL = process.env.NEXT_PUBLIC_GEMINI_API_URL;

// Get LLM Response
const getRealLlmResponse = async (message: string): Promise<string> => {
  try {
    if (!GEMINI_API_URL) {
      return "Error: Gemini API URL is not configured. Please set NEXT_PUBLIC_GEMINI_API_URL in your environment variables.";
    }
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ "text": `You are a helpful assistant for LayarNusantara, a website about Indonesian travel and culture. Keep your answers concise and informative. Be friendly. User's query: "${message}"` }]
        }],
        // Optional: Add generationConfig for more control if needed
        // generationConfig: {
        //   temperature: 0.7,
        //   topK: 1,
        //   topP: 1,
        //   maxOutputTokens: 256,
        // }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      // More specific error handling can be added based on errorData.error.message
      if (errorData?.error?.message.includes("API_KEY_INVALID")) {
         return "Error: The API key is invalid. Please check your API key settings.";
      }
      return `Error: Failed to fetch response from AI (HTTP ${response.status}). Please check the console for details.`;
    }

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0 &&
        data.candidates[0].content && data.candidates[0].content.parts &&
        data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else if (data.promptFeedback && data.promptFeedback.blockReason) {
      // Handle cases where the prompt was blocked
      console.warn('Prompt blocked by API:', data.promptFeedback.blockReason, data.promptFeedback.safetyRatings);
      return `I'm sorry, I can't respond to that query due to safety reasons (${data.promptFeedback.blockReason}). Could you try rephrasing or asking something else?`;
    }
    
    console.warn('Unexpected API response structure:', data);
    return "I received a response, but couldn't understand it. Please try again.";

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
        return "Error: API key not valid. Please pass a valid API key."
    }
    return "Error: Could not connect to the AI service. Please check your internet connection or try again later.";
  }
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialBotMessage: Message = {
    id: Date.now().toString(),
    sender: 'bot',
    text: (
      <div>
        <p className="font-semibold mb-2">Halo! 👋 Welcome to LayarNusantara Chat!</p>
        <p className="mb-3">I can help you with information about Indonesia. What would you like to know?</p>
      </div>
    ),
  };

  const quickOptions: Message = {
    id: 'options-1',
    sender: 'options',
    text: (
      <div className="flex flex-wrap gap-2 mt-1">
        <button
          onClick={() => handleOptionClick("Popular Culinary", "option_culinary")}
          className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          🍲 Popular Culinary
        </button>
        <button
          onClick={() => handleOptionClick("Tourism Hotspots", "option_tourism")}
          className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          🏖️ Tourism Hotspots
        </button>
        <button
          onClick={() => handleOptionClick("General Knowledge", "option_general")}
          className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          💡 General Knowledge
        </button>
      </div>
    )
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialBotMessage, quickOptions]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const processMessage = async (userMessageText: string, messageType: 'user_input' | 'option_click' = 'user_input') => {
    setIsLoading(true);
    
    // Remove options if a new message is sent or an option is clicked
    setMessages(prev => prev.filter(msg => msg.sender !== 'options'));

    const botResponseText = await getRealLlmResponse(userMessageText);
    
    const botMessage: Message = {
      id: Date.now().toString() + '-bot',
      text: botResponseText,
      sender: 'bot',
    };

    setMessages(prev => [...prev, botMessage, quickOptions]); // Add new quick options after bot response
    setIsLoading(false);
    setInputValue('');
  }


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    processMessage(inputValue);
  };

  const handleOptionClick = (optionText: string, optionValue: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: optionText,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    processMessage(optionValue, 'option_click');
  };


  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col border border-gray-300">
          {/* Header */}
          <div className="bg-green-600 text-white p-3 flex justify-between items-center rounded-t-lg">
            <div className='flex items-center'>
              <Sparkles size={20} className="mr-2" />
              <h3 className="font-semibold text-lg">LayarNusantara Bot</h3>
            </div>
            <button onClick={toggleChatbot} className="text-white hover:text-green-200">
              <ArrowDown size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && <Bot size={24} className="mr-2 text-green-600 flex-shrink-0" />}
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${
                    msg.sender === 'user'
                      ? 'bg-green-500 text-white'
                      : msg.sender === 'bot'
                      ? 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                      : 'bg-transparent w-full' // Options container
                  }`}
                >
                  {typeof msg.text === 'string' ? <p>{msg.text}</p> : msg.text}
                </div>
                {msg.sender === 'user' && <User size={24} className="ml-2 text-gray-400 flex-shrink-0" />}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <Bot size={24} className="mr-2 text-green-600" />
                <div className="max-w-[80%] p-3 rounded-xl bg-white border border-gray-200 text-gray-800 shadow-sm">
                  <div className="flex items-center space-x-1">
                    <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse delay-75"></span>
                    <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse delay-150"></span>
                    <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse delay-225"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ask about Indonesia..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-green-600 text-white p-2.5 rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors"
                disabled={isLoading || !inputValue.trim()}
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button onClick={toggleChatbot} aria-label="Open Chatbot">
          <ChatbotIcon />
        </button>
      )}
    </div>
  );
}