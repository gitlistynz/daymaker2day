import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { getServiceRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: 'Greetings. I am the DayMaker AI. Tell me how you are feeling, and I will recommend a session.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getServiceRecommendation(userMsg.text);

    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-neon-blue/20 border border-neon-blue text-neon-blue rounded-full hover:bg-neon-blue/40 hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(0,243,255,0.5)] animate-float"
        >
          <Bot size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 h-[500px] glass-panel rounded-2xl flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] border-neon-blue/30">
          {/* Header */}
          <div className="p-4 bg-black/40 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-2">
              <Bot className="text-neon-blue" size={20} />
              <span className="font-orbitron text-sm tracking-wider text-white">AI CONCIERGE</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-neon-purple/20 border border-neon-purple/50 text-white rounded-br-none'
                    : 'bg-white/10 border border-white/10 text-gray-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/10 p-3 rounded-xl rounded-bl-none flex items-center gap-2">
                  <span className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-neon-blue rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-neon-blue rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-black/40 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="How can we make your day?"
              className="flex-1 bg-transparent border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/40 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};