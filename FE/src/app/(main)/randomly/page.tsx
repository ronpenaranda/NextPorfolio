"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/db/supabase";

interface Message {
  id: number;
  content: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
}

const ChatComponent: React.FC = () => {
  const [sender_id, setSender_id] = useState<string>("");
  const [receiver_id, setReceiver_id] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [olderMessagesAvailable, setOlderMessagesAvailable] = useState(true);
  const [messageOffset, setMessageOffset] = useState(0);
  const MESSAGES_PER_PAGE = 10;

  const fetchMessages = async (
    limit: number,
    offset: number
  ): Promise<void> => {
    setLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("sender_id", sender_id)
      .eq("receiver_id", receiver_id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    setLoading(false);

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    if (data && data.length > 0) {
      setMessages((prev) => [...data.reverse(), ...prev]);
    }

    if (data && data.length < limit) {
      setOlderMessagesAvailable(false);
    }
  };

  const subscribeToMessages = (): (() => void) => {
    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMsg = payload.new as Message;
          console.log("New message received:", newMsg);

          if (
            (newMsg.sender_id === sender_id &&
              newMsg.receiver_id === receiver_id) ||
            (newMsg.sender_id === receiver_id &&
              newMsg.receiver_id === sender_id)
          ) {
            setMessages((prev) => [...prev, newMsg]);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  };

  const sendMessage = async (content: string): Promise<void> => {
    if (!content.trim() || !sender_id || !receiver_id) return;

    const { error } = await supabase
      .from("messages")
      .insert([{ content, sender_id, receiver_id }]);

    if (error) {
      console.error("Error sending message:", error);
    }
  };

  const loadOlderMessages = (): void => {
    const nextOffset = messageOffset + MESSAGES_PER_PAGE;
    setMessageOffset(nextOffset);
    fetchMessages(MESSAGES_PER_PAGE, nextOffset);
  };

  useEffect(() => {
    if (sender_id && receiver_id) {
      fetchMessages(MESSAGES_PER_PAGE, 0);
    }
    const unsubscribe = subscribeToMessages();

    return unsubscribe;
  }, [sender_id, receiver_id]);

  useEffect(() => {
    const container = document.querySelector(".messages-list");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const getMessageClass = (senderId: string) => {
    return senderId === sender_id
      ? "bg-white text-black self-end"
      : "bg-gray-300 text-black self-start";
  };

  return (
    <div className="chat-container w-full h-full mx-auto p-4">
      <div className="flex flex-grow gap-4 mb-4">
            <input
              type="text"
              id="senderid"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Sender ID"
              value={sender_id}
              onChange={(e) => setSender_id(e.target.value)}
            />
            <input
              type="text"
              id="receiverid"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Receiver ID"
              value={receiver_id}
              onChange={(e) => setReceiver_id(e.target.value)}
            />
      </div>
      {olderMessagesAvailable && (
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-full"
          onClick={loadOlderMessages}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load Older Messages"}
        </button>
      )}

      <div className="messages-list space-y-2 overflow-y-auto max-h-[580px] h-screen">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message p-2 rounded shadow-sm ${getMessageClass(
              msg.sender_id
            )}`}
          >
            <p className="text-gray-800">{msg.content}</p>
            <small className="text-gray-500 text-sm">
              {new Date(msg.created_at).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>
      <div className="send-message bg-gray-100 mt-4 p-4 rounded-xl">
        <input
          type="text"
          placeholder="Type a message..."
          className="rounded-lg p-6 w-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-slate-500 text-white px-4 py-2 rounded mt-2 w-full"
          onClick={() => {
            sendMessage(newMessage);
            setNewMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
