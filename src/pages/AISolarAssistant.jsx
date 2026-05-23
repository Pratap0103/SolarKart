import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Globe, MessageSquare } from 'lucide-react';
import Button from '../components/Button';

export default function AISolarAssistant({ chatMessages, onSendMessage, chatLang, onToggleLang, showToast }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  const handleSuggestClick = (q) => {
    onSendMessage(q);
  };

  const handleMicClick = () => {
    showToast('Voice typing requires browser audio permissions. Microphone listening simulated.');
    setInput(chatLang === 'EN' ? 'Check panel cleaning schedule' : 'पैनल सफाई कार्यक्रम की जांच करें');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const suggestQs = chatLang === 'EN' ? [
    'My generation is low',
    'When should I clean my panel?',
    'How much money did I save?',
    'When is my next maintenance?',
    'What is inverter fault 402?'
  ] : [
    'उत्पादन कम है',
    'पैनल कब साफ करना चाहिए?',
    'बचत की जांच करें',
    'अगला रखरखाव कब है?',
    'इन्वर्टर त्रुटि कोड 402 क्या है?'
  ];

  return (
    <div className="card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '540px', overflow: 'hidden' }}>
      
      {/* Chat header */}
      <div style={{ background: 'var(--dark-blue)', color: '#FFFFFF', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary-green)' }} />
          <div>
            <h4 style={{ fontSize: '13px', margin: '0' }}>SolarKart AI Assistant</h4>
            <span style={{ fontSize: '9px', color: '#94a3b8' }}>Active Response Agent</span>
          </div>
        </div>
        
        {/* Lang switch */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={onToggleLang}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', fontSize: '10px', background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }}
        >
          <Globe size={12} />
          {chatLang === 'EN' ? '🇬🇧 English' : '🇮🇳 हिंदी'}
        </button>
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', background: '#F8FAFC' }}>
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}
          >
            <div style={{
              background: msg.sender === 'user' ? 'var(--primary-green)' : '#FFFFFF',
              color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text-dark)',
              padding: '10px 14px',
              borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              fontSize: '13px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              border: msg.sender === 'user' ? 'none' : '1px solid #E2E8F0'
            }}>
              {msg.text}
            </div>
            <span style={{ fontSize: '9px', color: '#64748B', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', padding: '0 4px' }}>
              {msg.time}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions tags */}
      <div style={{ padding: '8px 12px', borderTop: '1px solid #E2E8F0', background: '#FFFFFF', display: 'flex', gap: '6px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {suggestQs.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggestClick(q)}
            style={{
              padding: '6px 12px',
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              borderRadius: '20px',
              fontSize: '11px',
              color: 'var(--dark-blue)',
              cursor: 'pointer',
              fontWeight: '500',
              outline: 'none'
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Inputs controls */}
      <div style={{ padding: '10px 12px', borderTop: '1px solid #E2E8F0', background: '#FFFFFF', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          className="icon-btn"
          onClick={handleMicClick}
          style={{ background: '#F1F5F9', width: '38px', height: '38px', borderRadius: '50%' }}
          title="Voice Command"
        >
          <Mic size={18} style={{ color: 'var(--primary-green)' }} />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={chatLang === 'EN' ? 'Ask AI about solar systems...' : 'सौर प्रणालियों के बारे में पूछें...'}
          style={{ flex: 1, height: '38px', borderRadius: '19px', border: '1px solid #CBD5E1', padding: '0 16px', fontSize: '13px', outline: 'none' }}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />

        <button
          className="icon-btn"
          onClick={handleSend}
          style={{ background: 'var(--primary-green)', width: '38px', height: '38px', borderRadius: '50%', color: '#FFFFFF' }}
          title="Send"
        >
          <Send size={16} />
        </button>
      </div>

      {/* Business Whatsapp helper */}
      <div style={{ background: '#DCFCE7', padding: '6px 12px', textAlign: 'center', fontSize: '11px', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        <MessageSquare size={12} />
        <span>Need a human agent?</span>
        <a
          href="https://wa.me/919988776655"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#15803d', fontWeight: 'bold', textDecoration: 'underline' }}
        >
          Contact Whatsapp Support
        </a>
      </div>
    </div>
  );
}
