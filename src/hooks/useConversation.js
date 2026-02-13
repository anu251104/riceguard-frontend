import { useState, useCallback } from "react";

const API = "http://127.0.0.1:8000";

export function useConversation() {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim()) return;

    setIsLoading(true);

    const updatedHistory = [
      ...conversationHistory,
      { role: "user", content: userMessage },
    ];

    setConversationHistory(updatedHistory);

    try {
      const response = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          body: JSON.stringify({
  message: userMessage,
  history: updatedHistory
})
,
        }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();

      const assistantMessage = {
        role: "assistant",
        content: data.reply,   // ✅ MUST match backend key
      };

      setConversationHistory((prev) => [...prev, assistantMessage]);

      return data.reply;

    } catch (err) {
      console.error("Chat failed:", err);

      setConversationHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't fetch expert advice.",
        },
      ]);

      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [conversationHistory]);

  const resetConversation = useCallback(() => {
    setConversationHistory([]);
  }, []);

  return { conversationHistory, sendMessage, resetConversation, isLoading };
}
