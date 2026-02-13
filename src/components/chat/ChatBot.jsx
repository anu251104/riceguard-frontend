import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { useConversation } from '../../hooks/useConversation';

export const ChatBot = ({ detectedDisease }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { conversationHistory, sendMessage, isLoading } = useConversation(detectedDisease);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const message = input;
    setInput('');
    try {
      await sendMessage(message);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <MessageSquare size={24} />
          <span className="font-semibold">Ask Expert</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-gray-900 w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden transition-all">
          {/* Header */}
          <div className="bg-green-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <MessageSquare size={20} />
              <h3 className="font-bold">Rice Expert AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-green-700 p-1 rounded">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
            {conversationHistory.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                <p>👋 Hi! I'm your rice farming assistant.</p>
                <p className="text-sm mt-2">Ask me about diseases, treatments, or farming tips.</p>
              </div>
            )}

            {conversationHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-green-600" />
                  <span className="text-xs text-gray-500">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent dark:text-white"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
