import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { PixelAvatarDisplay } from '../character/PixelAvatarDisplay';

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  message: string;
  timestamp: Date;
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'Alex',
    avatar: '{"face":{"patternIndex":0,"colorId":"blue"},"eyes":{"patternIndex":0,"colorId":"white"},"mouth":{"patternIndex":0,"colorId":"red"}}',
    message: 'Just completed my morning run! 🏃‍♂️',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: '2',
    sender: 'Maria',
    avatar: '{"face":{"patternIndex":0,"colorId":"purple"},"eyes":{"patternIndex":1,"colorId":"yellow"},"mouth":{"patternIndex":0,"colorId":"pink"}}',
    message: 'Great job! I\'m about to start my yoga session 🧘‍♀️',
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
  },
  {
    id: '3',
    sender: 'John',
    avatar: '{"face":{"patternIndex":1,"colorId":"green"},"eyes":{"patternIndex":0,"colorId":"cyan"},"mouth":{"patternIndex":1,"colorId":"orange"}}',
    message: 'Anyone up for a group challenge today? 💪',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
];

export function GuildChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'You',
      avatar: '{"face":{"patternIndex":0,"colorId":"red"},"eyes":{"patternIndex":1,"colorId":"white"},"mouth":{"patternIndex":0,"colorId":"red"}}',
      message: newMessage.trim(),
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[calc(100%-2rem)]">
      <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'You' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8">
                <PixelAvatarDisplay avatarData={msg.avatar} size={32} />
              </div>
              <div className="font-semibold text-sm text-gray-300">
                {msg.sender}
              </div>
            </div>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender === 'You'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-gray-100'
              }`}
            >
              <div>{msg.message}</div>
              <div className="text-xs opacity-75 mt-1">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2 mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!newMessage.trim()}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}