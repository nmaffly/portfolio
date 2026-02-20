import React, { useState, useRef, useEffect } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Ask me anything about my projects, experience, or technical skills.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const isInitialMount = useRef(true);

  // Auto-scroll to bottom when new messages arrive (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Call your Express backend on port 3001
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.slice(-4) // Send last 2 exchanges for context
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Add assistant response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }]);

    } catch (err) {
      console.error('Chat error:', err);
      setError('Sorry, something went wrong. Please try again.');
      
      // Add error message to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact me directly at nmaffly@example.com',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="col-span-12 h-[70vh] flex flex-col border border-[#111111]">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${
              msg.role === 'user' 
                ? 'bg-[#ececea]' 
                : 'bg-transparent'
            } border border-[#111111] p-4`}
          >
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-mono font-bold">
                [{msg.role === 'user' ? 'YOU' : 'NATE'}]
              </span>
              <span className="text-xs font-mono text-gray-600">
                {formatTime(msg.timestamp)}
              </span>
            </div>
            <p className="text-base leading-relaxed whitespace-pre-wrap">
              {msg.content}
            </p>
          </div>
        ))}

        {isLoading && (
          <div className="border border-[#111111] p-4">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-mono font-bold">[NATE]</span>
              <span className="text-xs font-mono text-gray-600">
                {formatTime(new Date())}
              </span>
            </div>
            <p className="text-base text-gray-600 font-mono">Typing...</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form 
        onSubmit={handleSubmit}
        className="border-t border-[#111111] p-4 flex gap-4"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about projects, experience, skills..."
          disabled={isLoading}
          className="flex-1 border border-[#111111] px-4 py-3 bg-[#f7f7f5] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="border border-[#111111] px-6 py-3 hover:bg-[#111111] hover:text-[#f7f7f5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
        >
          SEND
        </button>
      </form>

      {/* Suggestion chips (optional - can remove if too busy) */}
      <div className="border-t border-[#111111] p-4 flex flex-wrap gap-2">
        <button
          onClick={() => setInput('What did you build at ScoutAI?')}
          disabled={isLoading}
          className="text-xs font-mono border border-[#111111] px-3 py-1 hover:bg-[#ececea] transition-colors disabled:opacity-50"
        >
          ScoutAI project
        </button>
        <button
          onClick={() => setInput('What technologies do you use?')}
          disabled={isLoading}
          className="text-xs font-mono border border-[#111111] px-3 py-1 hover:bg-[#ececea] transition-colors disabled:opacity-50"
        >
          Tech stack
        </button>
        <button
          onClick={() => setInput('Tell me about your experience at Aggie Analytics')}
          disabled={isLoading}
          className="text-xs font-mono border border-[#111111] px-3 py-1 hover:bg-[#ececea] transition-colors disabled:opacity-50"
        >
          Leadership
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
