'use client'
import React, { useEffect, useState } from 'react';
import supabase from '@/db/supabase';

interface Message {
  id: number;
  content: string;
  created_at: string;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [olderMessagesAvailable, setOlderMessagesAvailable] = useState(true);
  const [messageOffset, setMessageOffset] = useState(0); 
  const MESSAGES_PER_PAGE = 10;

  const fetchMessages = async (limit: number, offset: number): Promise<void> => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false }) 
      .range(offset, offset + limit - 1);

      setLoading(false);

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }
  
      if (data && data.length > 0) {
        setMessages((prev) => [...data.reverse(), ...prev]);
      }
  
      if (data && data.length < limit) {
        setOlderMessagesAvailable(false);
      }
  };

  const subscribeToMessages = (): () => void => {
    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMsg = payload.new as Message;
          console.log('New message received:', newMsg);
          setMessages((prev) => [...prev, newMsg]); 
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe(); 
    };
  };

  const sendMessage = async (content: string): Promise<void> => {
    if (!content.trim()) return; 

    const { error } = await supabase.from('messages').insert([{ content }]);

    if (error) {
      console.error('Error sending message:', error);
    }
  };

  const loadOlderMessages = (): void => {
    const nextOffset = messageOffset + MESSAGES_PER_PAGE;
    setMessageOffset(nextOffset);
    fetchMessages(MESSAGES_PER_PAGE, nextOffset);
  };

  useEffect(() => {
    fetchMessages(MESSAGES_PER_PAGE, 0);
    const unsubscribe = subscribeToMessages();

    return unsubscribe;
  }, []);

  useEffect(() => {
    const container = document.querySelector('.messages-list');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container max-w-md mx-auto p-4 bg-gray-100 rounded shadow-md">
      {olderMessagesAvailable && (
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-full"
          onClick={loadOlderMessages}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load Older Messages'}
        </button>
      )}
      <div className="messages-list space-y-2 overflow-y-auto max-h-96">
        {messages.map((msg) => (
          <div key={msg.id} className="message bg-white p-2 rounded shadow-sm">
            <p className="text-gray-800">{msg.content}</p>
            <small className="text-gray-500 text-sm">
              {new Date(msg.created_at).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>

      <div className="send-message mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="border rounded p-2 w-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
          onClick={() => {
            sendMessage(newMessage);
            setNewMessage(''); 
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;