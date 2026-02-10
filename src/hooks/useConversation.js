import { useState, useCallback } from "react";

const API = import.meta.env.VITE_API_URL;


export function useConversation() {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userMessage) => {
    setIsLoading(true);

    // Build updated history first
    const updatedHistory = [
      ...conversationHistory,
      { role: "user", content: userMessage },
    ];

    // Optimistically update UI
    setConversationHistory(updatedHistory);

    try {
      const response = await fetch(`${API}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: updatedHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage = {
        role: "assistant",
        content: data.response,
      };

      setConversationHistory((prev) => [...prev, assistantMessage]);

      return data.response;
    } catch (err) {
      console.error("Chat failed:", err);
      alert("Chat failed. Check backend.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [conversationHistory]);

  const resetConversation = useCallback(() => {
    setConversationHistory([]);
  }, []);

  return {
    conversationHistory,
    sendMessage,
    resetConversation,
    isLoading,
  };
}
